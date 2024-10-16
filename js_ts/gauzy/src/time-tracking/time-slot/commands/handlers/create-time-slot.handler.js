"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTimeSlotHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const underscore_1 = require("underscore");
const chalk = __importStar(require("chalk"));
const index_1 = require("../../../../../plugins/contracts/dist/index");
const index_2 = require("../../../../../plugins/common/dist/index");
const context_1 = require("../../../../core/context");
const internal_1 = require("./../../../../core/entities/internal");
const time_slot_entity_1 = require("./../../time-slot.entity");
const create_time_slot_command_1 = require("../create-time-slot.command");
const commands_1 = require("../../../activity/commands");
const time_slot_merge_command_1 = require("./../time-slot-merge.command");
const database_helper_1 = require("./../../../../database/database.helper");
const type_orm_time_slot_repository_1 = require("../../repository/type-orm-time-slot.repository");
const type_orm_time_log_repository_1 = require("../../../time-log/repository/type-orm-time-log.repository");
const type_orm_employee_repository_1 = require("../../../../employee/repository/type-orm-employee.repository");
let CreateTimeSlotHandler = exports.CreateTimeSlotHandler = class CreateTimeSlotHandler {
    typeOrmTimeSlotRepository;
    typeOrmTimeLogRepository;
    typeOrmEmployeeRepository;
    commandBus;
    logging = true;
    constructor(typeOrmTimeSlotRepository, typeOrmTimeLogRepository, typeOrmEmployeeRepository, commandBus) {
        this.typeOrmTimeSlotRepository = typeOrmTimeSlotRepository;
        this.typeOrmTimeLogRepository = typeOrmTimeLogRepository;
        this.typeOrmEmployeeRepository = typeOrmEmployeeRepository;
        this.commandBus = commandBus;
    }
    async execute(command) {
        const { input } = command;
        let { organizationId, employeeId, activities = [] } = input;
        /** Get already running TimeLog based on source and logType */
        const source = input.source || index_1.TimeLogSourceEnum.DESKTOP;
        const logType = input.logType || index_1.TimeLogType.TRACKED;
        this.log(`Time Slot Interval Request: ${JSON.stringify(input)}`);
        const user = context_1.RequestContext.currentUser();
        const tenantId = context_1.RequestContext.currentTenantId();
        /**
         * Check logged user does not have employee selection permission
         */
        if (!context_1.RequestContext.hasPermission(index_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
            try {
                const employee = await this.typeOrmEmployeeRepository.findOneByOrFail({
                    userId: user.id,
                    tenantId
                });
                employeeId = employee.id;
                organizationId = employee.organizationId;
            }
            catch (error) {
                console.error(`Error finding logged in employee for (${user.name}) create bulk activities`, error);
            }
        }
        else if ((0, index_2.isEmpty)(employeeId) && context_1.RequestContext.currentEmployeeId()) {
            /*
            * If employeeId not send from desktop timer request payload
            */
            employeeId = context_1.RequestContext.currentEmployeeId();
        }
        /*
         * If organization not found in request then assign current logged user organization
         */
        if ((0, index_2.isEmpty)(organizationId)) {
            let employee = await this.typeOrmEmployeeRepository.findOneBy({
                id: employeeId
            });
            organizationId = employee ? employee.organizationId : null;
        }
        input.startedAt = (0, moment_1.default)(input.startedAt).utc().set('millisecond', 0).toDate();
        const minDate = input.startedAt;
        const maxDate = input.startedAt;
        let timeSlot;
        try {
            const query = this.typeOrmTimeSlotRepository.createQueryBuilder();
            query.leftJoinAndSelect(`${query.alias}.timeLogs`, 'timeLogs');
            query.where((qb) => {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."tenantId" = :tenantId`), { tenantId });
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."organizationId" = :organizationId`), { organizationId });
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."employeeId" = :employeeId`), { employeeId });
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."startedAt" = :startedAt`), { startedAt: input.startedAt });
            });
            this.log(`Get Time Slot Query & Parameters For employee (${user.name}): ${query.getQueryAndParameters()}`);
            timeSlot = await query.getOneOrFail();
        }
        catch (error) {
            if (!timeSlot) {
                timeSlot = new time_slot_entity_1.TimeSlot((0, underscore_1.omit)(input, ['timeLogId']));
                timeSlot.tenantId = tenantId;
                timeSlot.organizationId = organizationId;
                timeSlot.employeeId = employeeId;
                timeSlot.timeLogs = [];
            }
        }
        this.log(`Find Time Slot For Time: ${input.startedAt} for employee (${user.name}): ${JSON.stringify(timeSlot)}`);
        try {
            /**
             * Find TimeLog for TimeSlot Range
             */
            const query = this.typeOrmTimeLogRepository.createQueryBuilder();
            query.andWhere(new typeorm_2.Brackets((web) => {
                web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
                web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), { organizationId });
                web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."employeeId" = :employeeId`), { employeeId });
                web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."source" = :source`), { source });
                web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."logType" = :logType`), { logType });
                web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."stoppedAt" IS NOT NULL`));
            }));
            query.addOrderBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."createdAt"`), 'DESC');
            this.log(`Find timelog for specific query: ${query.getQueryAndParameters()}`);
            const timeLog = await query.getOneOrFail();
            this.log(`Found timelog for specific timeLog: ${JSON.stringify(timeLog)}`);
            timeSlot.timeLogs.push(timeLog);
        }
        catch (error) {
            if (input.timeLogId) {
                let timeLogIds = Array.isArray(input.timeLogId) ? input.timeLogId : [input.timeLogId];
                /**
                 * Find TimeLog for TimeSlot Range
                 */
                const query = this.typeOrmTimeLogRepository.createQueryBuilder();
                query.where((qb) => {
                    qb.andWhere(new typeorm_2.Brackets((web) => {
                        web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."tenantId" = :tenantId`), { tenantId });
                        web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."organizationId" = :organizationId`), { organizationId });
                        web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."source" = :source`), { source });
                        web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."logType" = :logType`), { logType });
                        web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."employeeId" = :employeeId`), { employeeId });
                        web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."stoppedAt" IS NOT NULL`));
                    }));
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."id" IN (:...timeLogIds)`), { timeLogIds });
                });
                this.log(`Timelog query for timeLog IDs for employee (${user.name}): ${query.getQueryAndParameters()}`);
                const timeLogs = await query.getMany();
                this.log(`Found recent time logs using timelog ids for employee (${user.name}): ${JSON.stringify(timeLogs)}`);
                timeSlot.timeLogs.push(...timeLogs);
            }
        }
        /**
         * Update TimeLog Entry Every TimeSlot Request From Desktop Timer
         */
        for await (const timeLog of timeSlot.timeLogs) {
            if (timeLog.isRunning) {
                await this.typeOrmTimeLogRepository.update(timeLog.id, {
                    stoppedAt: moment_1.default.utc().toDate()
                });
            }
        }
        this.log(`Bulk activities save parameters employee (${user.name}): ${JSON.stringify({
            organizationId,
            employeeId,
            activities,
            projectId: input.projectId,
        })}`);
        timeSlot.activities = await this.commandBus.execute(new commands_1.BulkActivitiesSaveCommand({
            organizationId,
            employeeId,
            activities,
            projectId: input.projectId,
        }));
        this.log(`Timeslot save first time before bulk activities save for employee (${user.name}): ${JSON.stringify(timeSlot)}`);
        await this.typeOrmTimeSlotRepository.save(timeSlot);
        /*
        * Merge timeSlots into 10 minutes slots
        */
        let [mergedTimeSlot] = await this.commandBus.execute(new time_slot_merge_command_1.TimeSlotMergeCommand(organizationId, employeeId, minDate, maxDate));
        if (mergedTimeSlot) {
            timeSlot = mergedTimeSlot;
        }
        this.log(`Final merged timeSlot for employee (${user.name}): ${JSON.stringify(timeSlot)}`);
        return await this.typeOrmTimeSlotRepository.findOne({
            where: {
                id: timeSlot.id
            },
            relations: {
                timeLogs: true,
                screenshots: true
            }
        });
    }
    /**
     * Private method for logging messages.
     * @param message - The message to be logged.
     */
    log(message) {
        if (this.logging) {
            console.log(chalk.green(`${(0, moment_1.default)().format('DD.MM.YYYY HH:mm:ss')}`));
            console.log(chalk.green(message));
            console.log(chalk.white('--------------------------------------------------------'));
            console.log(); // Add an empty line as a divider
        }
    }
};
exports.CreateTimeSlotHandler = CreateTimeSlotHandler = __decorate([
    (0, cqrs_1.CommandHandler)(create_time_slot_command_1.CreateTimeSlotCommand),
    __param(0, (0, typeorm_1.InjectRepository)(time_slot_entity_1.TimeSlot)),
    __param(1, (0, typeorm_1.InjectRepository)(internal_1.TimeLog)),
    __param(2, (0, typeorm_1.InjectRepository)(internal_1.Employee)),
    __metadata("design:paramtypes", [type_orm_time_slot_repository_1.TypeOrmTimeSlotRepository,
        type_orm_time_log_repository_1.TypeOrmTimeLogRepository,
        type_orm_employee_repository_1.TypeOrmEmployeeRepository,
        cqrs_1.CommandBus])
], CreateTimeSlotHandler);
//# sourceMappingURL=create-time-slot.handler.js.map
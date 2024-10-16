"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.TimeLogUpdateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const moment_1 = __importDefault(require("moment"));
const index_1 = require("../../../../../plugins/contracts/dist/index");
;
const time_log_entity_1 = require("./../../time-log.entity");
const time_log_update_command_1 = require("../time-log-update.command");
const commands_1 = require("./../../../timesheet/commands");
const time_slot_service_1 = require("../../../time-slot/time-slot.service");
const commands_2 = require("../../../../employee/commands");
const context_1 = require("./../../../../core/context");
const internal_1 = require("./../../../../core/entities/internal");
const database_helper_1 = require("./../../../../database/database.helper");
const type_orm_time_log_repository_1 = require("../../repository/type-orm-time-log.repository");
const type_orm_time_slot_repository_1 = require("../../../time-slot/repository/type-orm-time-slot.repository");
let TimeLogUpdateHandler = exports.TimeLogUpdateHandler = class TimeLogUpdateHandler {
    typeOrmTimeLogRepository;
    typeOrmTimeSlotRepository;
    commandBus;
    timeSlotService;
    constructor(typeOrmTimeLogRepository, typeOrmTimeSlotRepository, commandBus, timeSlotService) {
        this.typeOrmTimeLogRepository = typeOrmTimeLogRepository;
        this.typeOrmTimeSlotRepository = typeOrmTimeSlotRepository;
        this.commandBus = commandBus;
        this.timeSlotService = timeSlotService;
    }
    async execute(command) {
        const { id, input, manualTimeSlot } = command;
        let timeLog;
        if (id instanceof time_log_entity_1.TimeLog) {
            timeLog = id;
        }
        else {
            timeLog = await this.typeOrmTimeLogRepository.findOneBy({ id });
        }
        const tenantId = context_1.RequestContext.currentTenantId();
        const { employeeId, organizationId } = timeLog;
        let needToUpdateTimeSlots = false;
        if (input.startedAt || input.stoppedAt) {
            needToUpdateTimeSlots = true;
        }
        let timesheet;
        let updateTimeSlots = [];
        if (needToUpdateTimeSlots) {
            timesheet = await this.commandBus.execute(new commands_1.TimesheetFirstOrCreateCommand(input.startedAt, employeeId, organizationId));
            const { startedAt, stoppedAt } = Object.assign({}, timeLog, input);
            updateTimeSlots = this.timeSlotService.generateTimeSlots(startedAt, stoppedAt);
        }
        console.log('Stopped Timer Request Updated TimeLog Request', {
            input
        });
        await this.typeOrmTimeLogRepository.update(timeLog.id, {
            ...input,
            ...(timesheet ? { timesheetId: timesheet.id } : {})
        });
        const timeSlots = this.timeSlotService.generateTimeSlots(timeLog.startedAt, timeLog.stoppedAt);
        timeLog = await this.typeOrmTimeLogRepository.findOneBy({
            id: timeLog.id
        });
        const { timesheetId } = timeLog;
        if (needToUpdateTimeSlots) {
            const startTimes = timeSlots
                .filter((timeSlot) => {
                return (updateTimeSlots.filter((newSlot) => (0, moment_1.default)(newSlot.startedAt).isSame(timeSlot.startedAt)).length === 0);
            })
                .map((timeSlot) => new Date(timeSlot.startedAt));
            if (startTimes.length > 0) {
                /**
                 * Removed Deleted TimeSlots
                 */
                const query = this.typeOrmTimeSlotRepository.createQueryBuilder('time_slot');
                query.setFindOptions({
                    relations: {
                        screenshots: true
                    }
                });
                query.where((qb) => {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."organizationId" = :organizationId`), {
                        organizationId
                    });
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."tenantId" = :tenantId`), {
                        tenantId
                    });
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."employeeId" = :employeeId`), {
                        employeeId
                    });
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."startedAt" IN (:...startTimes)`), {
                        startTimes
                    });
                });
                const timeSlots = await query.getMany();
                await this.typeOrmTimeSlotRepository.remove(timeSlots);
            }
            if (!manualTimeSlot && timeLog.source === index_1.TimeLogSourceEnum.WEB_TIMER) {
                updateTimeSlots = updateTimeSlots
                    .map((slot) => ({
                    ...slot,
                    employeeId,
                    organizationId,
                    tenantId,
                    keyboard: 0,
                    mouse: 0,
                    overall: 0,
                    timeLogId: timeLog.id
                }))
                    .filter((slot) => slot.tenantId && slot.organizationId);
                /**
                 * Assign regenerated TimeSlot entries for existed TimeLog
                 */
                await this.timeSlotService.bulkCreate(updateTimeSlots, employeeId, organizationId);
            }
            console.log('Last Updated Timer Time Log', { timeLog });
            /**
             * Update TimeLog Entry
             */
            try {
                await this.typeOrmTimeLogRepository.save(timeLog);
            }
            catch (error) {
                console.error('Error while updating TimeLog', error);
            }
            /**
             * RECALCULATE timesheet activity
             */
            await this.commandBus.execute(new commands_1.TimesheetRecalculateCommand(timesheetId));
            /**
             * UPDATE employee total worked hours
             */
            if (employeeId) {
                await this.commandBus.execute(new commands_2.UpdateEmployeeTotalWorkedHoursCommand(employeeId));
            }
        }
        return await this.typeOrmTimeLogRepository.findOneBy({
            id: timeLog.id
        });
    }
};
exports.TimeLogUpdateHandler = TimeLogUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(time_log_update_command_1.TimeLogUpdateCommand),
    __param(0, (0, typeorm_1.InjectRepository)(time_log_entity_1.TimeLog)),
    __param(1, (0, typeorm_1.InjectRepository)(internal_1.TimeSlot)),
    __metadata("design:paramtypes", [type_orm_time_log_repository_1.TypeOrmTimeLogRepository,
        type_orm_time_slot_repository_1.TypeOrmTimeSlotRepository,
        cqrs_1.CommandBus,
        time_slot_service_1.TimeSlotService])
], TimeLogUpdateHandler);
//# sourceMappingURL=time-log-update.handler.js.map
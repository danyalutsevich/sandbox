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
exports.TimeLogCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../../../../plugins/contracts/dist/index");
;
const typeorm_1 = require("@nestjs/typeorm");
const moment_1 = __importDefault(require("moment"));
const time_log_entity_1 = require("./../../time-log.entity");
const time_log_create_command_1 = require("../time-log-create.command");
const time_slot_service_1 = require("../../../time-slot/time-slot.service");
const commands_1 = require("./../../../timesheet/commands");
const commands_2 = require("../../../../employee/commands");
const context_1 = require("../../../../core/context");
const type_orm_time_log_repository_1 = require("../../repository/type-orm-time-log.repository");
const mikro_orm_time_log_repository_1 = require("../../repository/mikro-orm-time-log.repository");
let TimeLogCreateHandler = exports.TimeLogCreateHandler = class TimeLogCreateHandler {
    typeOrmTimeLogRepository;
    mikroOrmTimeLogRepository;
    commandBus;
    timeSlotService;
    constructor(typeOrmTimeLogRepository, mikroOrmTimeLogRepository, commandBus, timeSlotService) {
        this.typeOrmTimeLogRepository = typeOrmTimeLogRepository;
        this.mikroOrmTimeLogRepository = mikroOrmTimeLogRepository;
        this.commandBus = commandBus;
        this.timeSlotService = timeSlotService;
    }
    async execute(command) {
        const { input } = command;
        const { startedAt, employeeId, organizationId } = input;
        const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
        const timesheet = await this.commandBus.execute(new commands_1.TimesheetFirstOrCreateCommand(startedAt, employeeId, organizationId));
        const timeLog = new time_log_entity_1.TimeLog({
            startedAt: moment_1.default.utc(startedAt).toDate(),
            ...(input.stoppedAt
                ? { stoppedAt: moment_1.default.utc(input.stoppedAt).toDate() }
                : {}),
            timesheet,
            organizationId,
            tenantId,
            employeeId,
            projectId: input.projectId || null,
            taskId: input.taskId || null,
            organizationContactId: input.organizationContactId || null,
            organizationTeamId: input.organizationTeamId || null,
            logType: input.logType || index_1.TimeLogType.MANUAL,
            description: input.description || null,
            reason: input.reason || null,
            isBillable: input.isBillable || false,
            source: input.source || index_1.TimeLogSourceEnum.WEB_TIMER,
            version: input.version || null,
            isRunning: input.isRunning || (input.source === index_1.TimeLogSourceEnum.DESKTOP)
        });
        let timeSlots = [];
        if (input.stoppedAt) {
            timeSlots = this.timeSlotService.generateTimeSlots(input.startedAt, input.stoppedAt).map((slot) => ({
                ...slot,
                employeeId,
                organizationId,
                tenantId,
                keyboard: 0,
                mouse: 0,
                overall: 0
            }));
        }
        if (input.timeSlots) {
            /*
             * Merge blank timeSlot if missing in request.
             * I.e
             * Time Logs is : 04:00:00 to  05:00:00 and pass time slots for 04:00:00, 04:20:00, 04:30:00, 04:40:00
             * then it will add  04:10:00,  04:50:00 as blank time slots in array to insert
             */
            input.timeSlots = input.timeSlots.map((timeSlot) => ({
                ...timeSlot,
                employeeId,
                organizationId,
                tenantId
            }));
            timeSlots = timeSlots.map((blankTimeSlot) => {
                let timeSlot = input.timeSlots.find((requestTimeSlot) => {
                    return (0, moment_1.default)(requestTimeSlot.startedAt).isSame(blankTimeSlot.startedAt); // true
                });
                timeSlot = timeSlot ? timeSlot : blankTimeSlot;
                timeSlot.employeeId = input.employeeId;
                return timeSlot;
            });
        }
        timeLog.timeSlots = await this.timeSlotService.bulkCreate(timeSlots, employeeId, organizationId);
        await this.typeOrmTimeLogRepository.save(timeLog);
        /**
         * RECALCULATE timesheet activity
         */
        if (timesheet) {
            const { id: timesheetId } = timesheet;
            await this.commandBus.execute(new commands_1.TimesheetRecalculateCommand(timesheetId));
        }
        /**
         * UPDATE employee total worked hours
         */
        await this.commandBus.execute(new commands_2.UpdateEmployeeTotalWorkedHoursCommand(employeeId));
        console.log('Newly created time log & request', {
            timeLog,
            input
        });
        return await this.typeOrmTimeLogRepository.findOneBy({
            id: timeLog.id
        });
    }
};
exports.TimeLogCreateHandler = TimeLogCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(time_log_create_command_1.TimeLogCreateCommand),
    __param(0, (0, typeorm_1.InjectRepository)(time_log_entity_1.TimeLog)),
    __metadata("design:paramtypes", [type_orm_time_log_repository_1.TypeOrmTimeLogRepository,
        mikro_orm_time_log_repository_1.MikroOrmTimeLogRepository,
        cqrs_1.CommandBus,
        time_slot_service_1.TimeSlotService])
], TimeLogCreateHandler);
//# sourceMappingURL=time-log-create.handler.js.map
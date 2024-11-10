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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeLogDeleteHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const underscore_1 = require("underscore");
const time_log_entity_1 = require("./../../time-log.entity");
const timesheet_recalculate_command_1 = require("./../../../timesheet/commands/timesheet-recalculate.command");
const time_log_delete_command_1 = require("../time-log-delete.command");
const commands_1 = require("../../../../employee/commands");
const commands_2 = require("./../../../time-slot/commands");
const type_orm_time_log_repository_1 = require("../../repository/type-orm-time-log.repository");
const mikro_orm_time_log_repository_1 = require("../..//repository/mikro-orm-time-log.repository");
let TimeLogDeleteHandler = exports.TimeLogDeleteHandler = class TimeLogDeleteHandler {
    typeOrmTimeLogRepository;
    mikroOrmTimeLogRepository;
    commandBus;
    constructor(typeOrmTimeLogRepository, mikroOrmTimeLogRepository, commandBus) {
        this.typeOrmTimeLogRepository = typeOrmTimeLogRepository;
        this.mikroOrmTimeLogRepository = mikroOrmTimeLogRepository;
        this.commandBus = commandBus;
    }
    async execute(command) {
        const { ids, forceDelete } = command;
        let timeLogs;
        if (typeof ids === 'string') {
            timeLogs = await this.typeOrmTimeLogRepository.findBy({ id: ids });
        }
        else if (ids instanceof Array && typeof ids[0] === 'string') {
            timeLogs = await this.typeOrmTimeLogRepository.findBy({
                id: (0, typeorm_2.In)(ids)
            });
        }
        else if (ids instanceof time_log_entity_1.TimeLog) {
            timeLogs = [ids];
        }
        else {
            timeLogs = ids;
        }
        console.log('TimeLog will be delete:', timeLogs);
        for await (const timeLog of timeLogs) {
            const { employeeId, organizationId, timeSlots } = timeLog;
            const timeSlotsIds = (0, underscore_1.pluck)(timeSlots, 'id');
            await this.commandBus.execute(new commands_2.TimeSlotBulkDeleteCommand({
                organizationId,
                employeeId,
                timeLog,
                timeSlotsIds
            }));
        }
        let deleteResult;
        if (forceDelete) {
            deleteResult = await this.typeOrmTimeLogRepository.delete({
                id: (0, typeorm_2.In)((0, underscore_1.pluck)(timeLogs, 'id'))
            });
        }
        else {
            deleteResult = await this.typeOrmTimeLogRepository.softDelete({
                id: (0, typeorm_2.In)((0, underscore_1.pluck)(timeLogs, 'id'))
            });
        }
        try {
            /**
             * Timesheet Recalculate Command
             */
            const timesheetIds = (0, underscore_1.chain)(timeLogs).pluck('timesheetId').uniq().value();
            for await (const timesheetId of timesheetIds) {
                await this.commandBus.execute(new timesheet_recalculate_command_1.TimesheetRecalculateCommand(timesheetId));
            }
            /**
             * Employee Worked Hours Recalculate Command
             */
            const employeeIds = (0, underscore_1.chain)(timeLogs).pluck('employeeId').uniq().value();
            for await (const employeeId of employeeIds) {
                await this.commandBus.execute(new commands_1.UpdateEmployeeTotalWorkedHoursCommand(employeeId));
            }
        }
        catch (error) {
            console.log('TimeLogDeleteHandler', { error });
        }
        return deleteResult;
    }
};
exports.TimeLogDeleteHandler = TimeLogDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(time_log_delete_command_1.TimeLogDeleteCommand),
    __param(0, (0, typeorm_1.InjectRepository)(time_log_entity_1.TimeLog)),
    __metadata("design:paramtypes", [type_orm_time_log_repository_1.TypeOrmTimeLogRepository,
        mikro_orm_time_log_repository_1.MikroOrmTimeLogRepository,
        cqrs_1.CommandBus])
], TimeLogDeleteHandler);
//# sourceMappingURL=time-log-delete.handler.js.map
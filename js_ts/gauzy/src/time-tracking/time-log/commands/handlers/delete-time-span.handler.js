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
exports.DeleteTimeSpanHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const underscore_1 = __importDefault(require("underscore"));
;
const index_1 = require("../../../../../plugins/common/dist/index");
const moment_extend_1 = require("../../../../core/moment-extend");
const internal_1 = require("./../../../../core/entities/internal");
const commands_1 = require("./../../../timesheet/commands");
const time_log_entity_1 = require("./../../time-log.entity");
const delete_time_span_command_1 = require("../delete-time-span.command");
const time_log_update_command_1 = require("../time-log-update.command");
const time_log_delete_command_1 = require("../time-log-delete.command");
const time_slot_service_1 = require("../../../time-slot/time-slot.service");
const commands_2 = require("./../../../time-slot/commands");
const utils_1 = require("./../../../time-slot/utils");
const type_orm_time_log_repository_1 = require("../../repository/type-orm-time-log.repository");
const type_orm_time_slot_repository_1 = require("../../../time-slot/repository/type-orm-time-slot.repository");
let DeleteTimeSpanHandler = exports.DeleteTimeSpanHandler = class DeleteTimeSpanHandler {
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
        const { newTime, timeLog, timeSlot } = command;
        const { id } = timeLog;
        const { start, end } = newTime;
        const refreshTimeLog = await this.typeOrmTimeLogRepository.findOne({
            where: {
                id: id
            },
            relations: {
                timeSlots: true
            }
        });
        const { startedAt, stoppedAt, employeeId, organizationId, timesheetId } = refreshTimeLog;
        const newTimeRange = moment_extend_1.moment.range(start, end);
        const dbTimeRange = moment_extend_1.moment.range(startedAt, stoppedAt);
        console.log({ newTimeRange, dbTimeRange });
        /*
         * Check is overlapping time or not.
         */
        if (!newTimeRange.overlaps(dbTimeRange, { adjacent: false })) {
            console.log('Not Overlapping', newTimeRange, dbTimeRange);
            /**
             * If TimeSlot Not Overlapping the TimeLog
             * Still we have to remove that TimeSlot with screenshots/activities
             */
            if (employeeId && start && end) {
                const timeSlotsIds = [timeSlot.id];
                await this.commandBus.execute(new commands_2.TimeSlotBulkDeleteCommand({
                    organizationId,
                    employeeId,
                    timeLog: refreshTimeLog,
                    timeSlotsIds
                }, true));
                await this.commandBus.execute(new commands_1.TimesheetRecalculateCommand(timesheetId));
            }
        }
        if ((0, moment_extend_1.moment)(startedAt).isBetween((0, moment_extend_1.moment)(start), (0, moment_extend_1.moment)(end), null, '[]')) {
            if ((0, moment_extend_1.moment)(stoppedAt).isBetween((0, moment_extend_1.moment)(start), (0, moment_extend_1.moment)(end), null, '[]')) {
                /*
                 * Delete time log because overlap entire time.
                 * New Start time							New Stop time
                 * |-----------------------------------------------------|
                 * 		DB Start Time				DB Stop Time
                 *  		|--------------------------------------|
                 */
                console.log('Delete time log because overlap entire time.');
                try {
                    await this.commandBus.execute(new time_log_delete_command_1.TimeLogDeleteCommand(refreshTimeLog, true));
                }
                catch (error) {
                    console.log('Error while, delete time log because overlap entire time.', error);
                }
            }
            else {
                /*
                 * Update start time
                 * New Start time							New Stop time
                 * |-----------------------------------------------------|
                 * 		DB Start Time				DB Stop Time
                 * 		|--------------------------------------	|
                 */
                const remainingDuration = (0, moment_extend_1.moment)(stoppedAt).diff((0, moment_extend_1.moment)(end), 'seconds');
                if (remainingDuration > 0) {
                    try {
                        console.log('Update startedAt time.');
                        let updatedTimeLog = await this.commandBus.execute(new time_log_update_command_1.TimeLogUpdateCommand({
                            startedAt: end
                        }, refreshTimeLog, true));
                        const timeSlotsIds = [timeSlot.id];
                        await this.commandBus.execute(new commands_2.TimeSlotBulkDeleteCommand({
                            organizationId,
                            employeeId,
                            timeLog: updatedTimeLog,
                            timeSlotsIds
                        }, true));
                        /*
                        * Delete TimeLog if remaining timeSlots are 0
                        */
                        updatedTimeLog = await this.typeOrmTimeLogRepository.findOne({
                            where: {
                                id: updatedTimeLog.id
                            },
                            relations: {
                                timeSlots: true
                            }
                        });
                        if ((0, index_1.isEmpty)(updatedTimeLog.timeSlots)) {
                            await this.commandBus.execute(new time_log_delete_command_1.TimeLogDeleteCommand(updatedTimeLog, true));
                        }
                    }
                    catch (error) {
                        console.log('Error while, updating startedAt time', error);
                    }
                }
                else {
                    console.log('Delete startedAt time log.');
                    try {
                        /*
                        * Delete if remaining duration 0 seconds
                        */
                        await this.commandBus.execute(new time_log_delete_command_1.TimeLogDeleteCommand(refreshTimeLog, true));
                    }
                    catch (error) {
                        console.log('Error while, deleting time log for startedAt time', error);
                    }
                }
            }
        }
        else {
            if ((0, moment_extend_1.moment)(timeLog.stoppedAt).isBetween((0, moment_extend_1.moment)(start), (0, moment_extend_1.moment)(end), null, '[]')) {
                /*
                 * Update stopped time
                 * New Start time							New Stop time
                 * |----------------------------------------------------|
                 * 		DB Start Time				DB Stop Time
                 * 		|--------------------------------------|
                 */
                const remainingDuration = (0, moment_extend_1.moment)(end).diff((0, moment_extend_1.moment)(startedAt), 'seconds');
                if (remainingDuration > 0) {
                    console.log('Update stoppedAt time.');
                    try {
                        let updatedTimeLog = await this.commandBus.execute(new time_log_update_command_1.TimeLogUpdateCommand({
                            stoppedAt: start
                        }, timeLog, true));
                        const timeSlotsIds = [timeSlot.id];
                        await this.commandBus.execute(new commands_2.TimeSlotBulkDeleteCommand({
                            organizationId,
                            employeeId,
                            timeLog: updatedTimeLog,
                            timeSlotsIds
                        }, true));
                        /*
                        * Delete TimeLog if remaining timeSlots are 0
                        */
                        updatedTimeLog = await this.typeOrmTimeLogRepository.findOne({
                            where: {
                                id: updatedTimeLog.id
                            },
                            relations: {
                                timeSlots: true
                            }
                        });
                        if ((0, index_1.isEmpty)(updatedTimeLog.timeSlots)) {
                            await this.commandBus.execute(new time_log_delete_command_1.TimeLogDeleteCommand(updatedTimeLog, true));
                        }
                    }
                    catch (error) {
                        console.log('Error while, updating stoppedAt time', error);
                    }
                }
                else {
                    console.log('Delete stoppedAt time log.');
                    try {
                        /*
                        * Delete if remaining duration 0 seconds
                        */
                        await this.commandBus.execute(new time_log_delete_command_1.TimeLogDeleteCommand(refreshTimeLog, true));
                    }
                    catch (error) {
                        console.log('Error while, deleting time log for stoppedAt time', error);
                    }
                }
            }
            else {
                /*
                 * Split database time in two entries.
                 * New Start time (start)						New Stop time (end)
                 * |---------------------------------------------------------------|
                 * 		DB Start Time (startedAt)	DB Stop Time (stoppedAt)
                 *  		|--------------------------------------------------|
                 */
                console.log('Split database time in two entries.');
                const remainingDuration = (0, moment_extend_1.moment)(start).diff((0, moment_extend_1.moment)(startedAt), 'seconds');
                const timeLogClone = underscore_1.default.omit(timeLog, [
                    'createdAt',
                    'updatedAt',
                    'id'
                ]);
                try {
                    if (remainingDuration > 0) {
                        try {
                            timeLog.stoppedAt = start;
                            await this.typeOrmTimeLogRepository.save(timeLog);
                        }
                        catch (error) {
                            console.error(`Error while updating old timelog`, error);
                        }
                    }
                    else {
                        /*
                        * Delete if remaining duration 0 seconds
                        */
                        try {
                            await this.commandBus.execute(new time_log_delete_command_1.TimeLogDeleteCommand(refreshTimeLog, true));
                        }
                        catch (error) {
                            console.error(`Error while deleting old timelog`, error);
                        }
                    }
                    const timeSlotsIds = [timeSlot.id];
                    await this.commandBus.execute(new commands_2.TimeSlotBulkDeleteCommand({
                        organizationId,
                        employeeId,
                        timeLog,
                        timeSlotsIds
                    }, true));
                }
                catch (error) {
                    console.error(`Error while split time entires: ${remainingDuration}`);
                }
                const newLog = timeLogClone;
                newLog.startedAt = end;
                const newLogRemainingDuration = (0, moment_extend_1.moment)(newLog.stoppedAt).diff((0, moment_extend_1.moment)(newLog.startedAt), 'seconds');
                /*
                 * Insert if remaining duration is more 0 seconds
                 */
                if (newLogRemainingDuration > 0) {
                    try {
                        await this.typeOrmTimeLogRepository.save(newLog);
                    }
                    catch (error) {
                        console.log('Error while creating new log', error, newLog);
                    }
                    try {
                        const timeSlots = await this.syncTimeSlots(newLog);
                        console.log('Sync TimeSlots for new log', { timeSlots }, { newLog });
                        if ((0, index_1.isNotEmpty)(timeSlots)) {
                            let timeLogs = [];
                            timeLogs = timeLogs.concat(newLog);
                            for await (const timeSlot of timeSlots) {
                                timeSlot.timeLogs = timeLogs;
                            }
                            try {
                                await this.typeOrmTimeSlotRepository.save(timeSlots);
                            }
                            catch (error) {
                                console.log('Error while creating new TimeSlot & TimeLog entires', error, timeSlots);
                            }
                        }
                    }
                    catch (error) {
                        console.log('Error while syncing TimeSlot & TimeLog', error);
                    }
                }
            }
        }
        return true;
    }
    async syncTimeSlots(timeLog) {
        const { startedAt, stoppedAt, employeeId, organizationId } = timeLog;
        const { start, end } = (0, utils_1.getStartEndIntervals)((0, moment_extend_1.moment)(startedAt), (0, moment_extend_1.moment)(stoppedAt));
        return await this.timeSlotService.getTimeSlots({
            startDate: (0, moment_extend_1.moment)(start).toDate(),
            endDate: (0, moment_extend_1.moment)(end).toDate(),
            organizationId,
            employeeIds: [employeeId],
            syncSlots: true
        });
    }
};
exports.DeleteTimeSpanHandler = DeleteTimeSpanHandler = __decorate([
    (0, cqrs_1.CommandHandler)(delete_time_span_command_1.DeleteTimeSpanCommand),
    __param(0, (0, typeorm_1.InjectRepository)(time_log_entity_1.TimeLog)),
    __param(1, (0, typeorm_1.InjectRepository)(internal_1.TimeSlot)),
    __metadata("design:paramtypes", [type_orm_time_log_repository_1.TypeOrmTimeLogRepository,
        type_orm_time_slot_repository_1.TypeOrmTimeSlotRepository,
        cqrs_1.CommandBus,
        time_slot_service_1.TimeSlotService])
], DeleteTimeSpanHandler);
//# sourceMappingURL=delete-time-span.handler.js.map
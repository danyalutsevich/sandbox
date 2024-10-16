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
exports.TimeSlotMergeHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const underscore_1 = require("underscore");
;
const index_1 = require("../../../../../plugins/common/dist/index");
const time_slot_merge_command_1 = require("../time-slot-merge.command");
const internal_1 = require("./../../../../core/entities/internal");
const context_1 = require("./../../../../core/context");
const utils_1 = require("./../../../../core/utils");
const commands_1 = require("./../../../timesheet/commands");
const commands_2 = require("./../../../../employee/commands");
const database_helper_1 = require("./../../../../database/database.helper");
const type_orm_time_slot_repository_1 = require("../../repository/type-orm-time-slot.repository");
let TimeSlotMergeHandler = exports.TimeSlotMergeHandler = class TimeSlotMergeHandler {
    typeOrmTimeSlotRepository;
    commandBus;
    constructor(typeOrmTimeSlotRepository, commandBus) {
        this.typeOrmTimeSlotRepository = typeOrmTimeSlotRepository;
        this.commandBus = commandBus;
    }
    /**
     *
     * @param command
     * @returns
     */
    async execute(command) {
        let { organizationId, employeeId, start, end } = command;
        const tenantId = context_1.RequestContext.currentTenantId();
        let startMinute = (0, moment_1.default)(start).utc().get('minute');
        startMinute = startMinute - (startMinute % 10);
        let startDate = (0, moment_1.default)(start)
            .utc()
            .set('minute', startMinute)
            .set('second', 0)
            .set('millisecond', 0);
        let endMinute = (0, moment_1.default)(end).utc().get('minute');
        endMinute = endMinute - (endMinute % 10);
        let endDate = (0, moment_1.default)(end)
            .utc()
            .set('minute', endMinute + 10)
            .set('second', 0)
            .set('millisecond', 0);
        const { start: startedAt, end: stoppedAt } = (0, utils_1.getDateRangeFormat)(startDate, endDate);
        console.log({ startedAt, stoppedAt }, 'Time Slot Merging Dates');
        // GET Time Slots for the given date range slot
        const timeSlots = await this.getTimeSlots({
            organizationId,
            employeeId,
            tenantId,
            startedAt,
            stoppedAt
        });
        const createdTimeSlots = [];
        if ((0, index_1.isNotEmpty)(timeSlots)) {
            const groupByTimeSlots = (0, underscore_1.chain)(timeSlots).groupBy((timeSlot) => {
                let date = (0, moment_1.default)(timeSlot.startedAt);
                const minutes = date.get('minute');
                date = date
                    .set('minute', minutes - (minutes % 10))
                    .set('second', 0)
                    .set('millisecond', 0);
                return date.format('YYYY-MM-DD HH:mm:ss');
            });
            const savePromises = groupByTimeSlots.mapObject(async (timeSlots, slotStart) => {
                const [timeSlot] = timeSlots;
                let timeLogs = [];
                let screenshots = [];
                let activities = [];
                let duration = 0;
                let keyboard = 0;
                let mouse = 0;
                let overall = 0;
                const calculateValue = (value) => parseInt(value, 10) || 0;
                duration += timeSlots.reduce((acc, slot) => acc + calculateValue(slot.duration), 0);
                keyboard += timeSlots.reduce((acc, slot) => acc + calculateValue(slot.keyboard), 0);
                mouse += timeSlots.reduce((acc, slot) => acc + calculateValue(slot.mouse), 0);
                overall += timeSlots.reduce((acc, slot) => acc + calculateValue(slot.overall), 0);
                screenshots = screenshots.concat(...timeSlots.map(slot => slot.screenshots || []));
                timeLogs = timeLogs.concat(...timeSlots.map(slot => slot.timeLogs || []));
                activities = activities.concat(...timeSlots.map(slot => slot.activities || []));
                const nonZeroKeyboardSlots = timeSlots.filter((item) => item.keyboard !== 0);
                const timeSlotsLength = nonZeroKeyboardSlots.length;
                keyboard = Math.round(keyboard / timeSlotsLength || 0);
                mouse = Math.round(mouse / timeSlotsLength || 0);
                const activity = {
                    duration: Math.max(0, Math.min(600, duration)),
                    overall: Math.max(0, Math.min(600, overall)),
                    keyboard: Math.max(0, Math.min(600, keyboard)),
                    mouse: Math.max(0, Math.min(600, mouse)),
                };
                /*
                * Map old screenshots newly created TimeSlot
                */
                screenshots = screenshots.map((item) => new internal_1.Screenshot((0, underscore_1.omit)(item, ['timeSlotId'])));
                /*
                * Map old activities newly created TimeSlot
                */
                activities = activities.map((item) => new internal_1.Activity((0, underscore_1.omit)(item, ['timeSlotId'])));
                timeLogs = (0, underscore_1.uniq)(timeLogs, (log) => log.id);
                const newTimeSlot = new internal_1.TimeSlot({
                    ...(0, underscore_1.omit)(timeSlot),
                    ...activity,
                    screenshots,
                    activities,
                    timeLogs,
                    startedAt: (0, moment_1.default)(slotStart).toDate(),
                    tenantId,
                    organizationId,
                    employeeId
                });
                console.log('Newly Created Time Slot', newTimeSlot);
                await this.updateTimeLogAndEmployeeTotalWorkedHours(newTimeSlot);
                await this.typeOrmTimeSlotRepository.save(newTimeSlot);
                createdTimeSlots.push(newTimeSlot);
                const ids = (0, underscore_1.pluck)(timeSlots, 'id');
                ids.splice(0, 1);
                console.log('TimeSlots Ids Will Be Deleted:', ids);
                if (ids.length > 0) {
                    await this.typeOrmTimeSlotRepository.delete({
                        id: (0, typeorm_2.In)(ids)
                    });
                }
            }).values().value();
            await Promise.all(savePromises);
        }
        return createdTimeSlots;
    }
    /**
     * Get time slots for the given date range.
     *
     * @param param0 - An object containing parameters like organizationId, employeeId, tenantId, startedAt, and stoppedAt.
     * @returns A promise that resolves to an array of TimeSlot instances.
     */
    async getTimeSlots({ organizationId, employeeId, tenantId, startedAt, stoppedAt }) {
        /**
         * GET Time Slots for given date range slot
         */
        const query = this.typeOrmTimeSlotRepository.createQueryBuilder();
        query.leftJoinAndSelect(`${query.alias}.timeLogs`, 'timeLogs');
        query.leftJoinAndSelect(`${query.alias}.screenshots`, 'screenshots');
        query.leftJoinAndSelect(`${query.alias}.activities`, 'activities');
        query.where((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."startedAt" >= :startedAt AND "${qb.alias}"."startedAt" < :stoppedAt`), {
                startedAt,
                stoppedAt
            });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."employeeId" = :employeeId`), {
                employeeId
            });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."organizationId" = :organizationId`), {
                organizationId
            });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."tenantId" = :tenantId`), {
                tenantId
            });
        });
        query.addOrderBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."createdAt"`), 'ASC');
        const timeSlots = await query.getMany();
        return timeSlots;
    }
    /**
     *
     * @param newTimeSlot
     */
    async updateTimeLogAndEmployeeTotalWorkedHours(newTimeSlot) {
        /**
         * Update TimeLog Entry Every TimeSlot Request From Desktop Timer
         * RECALCULATE timesheet activity
         */
        for await (const timeLog of newTimeSlot.timeLogs) {
            await this.commandBus.execute(new commands_1.TimesheetRecalculateCommand(timeLog.timesheetId));
        }
        /**
         * UPDATE employee total worked hours
         */
        if (newTimeSlot.employeeId) {
            await this.commandBus.execute(new commands_2.UpdateEmployeeTotalWorkedHoursCommand(newTimeSlot.employeeId));
        }
    }
};
exports.TimeSlotMergeHandler = TimeSlotMergeHandler = __decorate([
    (0, cqrs_1.CommandHandler)(time_slot_merge_command_1.TimeSlotMergeCommand),
    __param(0, (0, typeorm_1.InjectRepository)(internal_1.TimeSlot)),
    __metadata("design:paramtypes", [type_orm_time_slot_repository_1.TypeOrmTimeSlotRepository,
        cqrs_1.CommandBus])
], TimeSlotMergeHandler);
//# sourceMappingURL=time-slot-merge.handler.js.map
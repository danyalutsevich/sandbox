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
exports.ScheduleTimeSlotEntriesHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const index_1 = require("../../../../../plugins/common/dist/index");
const time_slot_entity_1 = require("./../../time-slot.entity");
const schedule_time_slot_entries_command_1 = require("../schedule-time-slot-entries.command");
const database_helper_1 = require("./../../../../database/database.helper");
const type_orm_time_slot_repository_1 = require("../../repository/type-orm-time-slot.repository");
let ScheduleTimeSlotEntriesHandler = exports.ScheduleTimeSlotEntriesHandler = class ScheduleTimeSlotEntriesHandler {
    typeOrmTimeSlotRepository;
    constructor(typeOrmTimeSlotRepository) {
        this.typeOrmTimeSlotRepository = typeOrmTimeSlotRepository;
    }
    /**
     *
     * @param command
     */
    async execute(command) {
        const query = this.typeOrmTimeSlotRepository.createQueryBuilder('time_slot');
        query.setFindOptions({
            relations: {
                timeLogs: true
            }
        });
        query.where((qb) => {
            qb.orWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."overall" < :overall`), {
                overall: 0
            });
            qb.orWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."keyboard" < :keyboard`), {
                keyboard: 0
            });
            qb.orWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."mouse" < :mouse`), {
                mouse: 0
            });
            qb.orWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."duration" > :duration`), {
                duration: 600
            });
        });
        const timeSlots = await query.getMany();
        if ((0, index_1.isNotEmpty)(timeSlots)) {
            for await (const timeSlot of timeSlots) {
                await this.typeOrmTimeSlotRepository.save({
                    id: timeSlot.id,
                    duration: (timeSlot.duration < 0) ? 0 : (timeSlot.duration > 600) ? 600 : timeSlot.duration,
                    overall: (timeSlot.overall < 0) ? 0 : (timeSlot.overall > 600) ? 600 : timeSlot.overall,
                    keyboard: (timeSlot.keyboard < 0) ? 0 : (timeSlot.keyboard > 600) ? 600 : timeSlot.keyboard,
                    mouse: (timeSlot.mouse < 0) ? 0 : (timeSlot.mouse > 600) ? 600 : timeSlot.mouse
                });
            }
        }
    }
};
exports.ScheduleTimeSlotEntriesHandler = ScheduleTimeSlotEntriesHandler = __decorate([
    (0, cqrs_1.CommandHandler)(schedule_time_slot_entries_command_1.ScheduleTimeSlotEntriesCommand),
    __param(0, (0, typeorm_1.InjectRepository)(time_slot_entity_1.TimeSlot)),
    __metadata("design:paramtypes", [type_orm_time_slot_repository_1.TypeOrmTimeSlotRepository])
], ScheduleTimeSlotEntriesHandler);
//# sourceMappingURL=schedule-time-slot-entries.handler.js.map
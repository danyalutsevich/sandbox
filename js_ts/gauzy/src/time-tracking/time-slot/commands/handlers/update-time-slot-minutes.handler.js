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
exports.UpdateTimeSlotMinutesHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const time_slot_minute_entity_1 = require("./../../time-slot-minute.entity");
const update_time_slot_minutes_command_1 = require("../update-time-slot-minutes.command");
const type_orm_time_slot_minute_repository_1 = require("../../repository/type-orm-time-slot-minute.repository");
let UpdateTimeSlotMinutesHandler = exports.UpdateTimeSlotMinutesHandler = class UpdateTimeSlotMinutesHandler {
    typeOrmTimeSlotMinuteRepository;
    constructor(typeOrmTimeSlotMinuteRepository) {
        this.typeOrmTimeSlotMinuteRepository = typeOrmTimeSlotMinuteRepository;
    }
    async execute(command) {
        const { input, id } = command;
        let timeMinute = await this.typeOrmTimeSlotMinuteRepository.findOneBy({
            id
        });
        if (timeMinute) {
            delete input.timeSlotId;
            await this.typeOrmTimeSlotMinuteRepository.update(id, input);
            return await this.typeOrmTimeSlotMinuteRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    timeSlot: true
                }
            });
        }
        else {
            return null;
        }
    }
};
exports.UpdateTimeSlotMinutesHandler = UpdateTimeSlotMinutesHandler = __decorate([
    (0, cqrs_1.CommandHandler)(update_time_slot_minutes_command_1.UpdateTimeSlotMinutesCommand),
    __param(0, (0, typeorm_1.InjectRepository)(time_slot_minute_entity_1.TimeSlotMinute)),
    __metadata("design:paramtypes", [type_orm_time_slot_minute_repository_1.TypeOrmTimeSlotMinuteRepository])
], UpdateTimeSlotMinutesHandler);
//# sourceMappingURL=update-time-slot-minutes.handler.js.map
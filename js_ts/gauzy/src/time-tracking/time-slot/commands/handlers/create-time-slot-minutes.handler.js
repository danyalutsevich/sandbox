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
exports.CreateTimeSlotMinutesHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const create_time_slot_minutes_command_1 = require("../create-time-slot-minutes.command");
const time_slot_minute_entity_1 = require("./../../time-slot-minute.entity");
const update_time_slot_minutes_command_1 = require("../update-time-slot-minutes.command");
const context_1 = require("../../../../core/context");
const type_orm_time_slot_minute_repository_1 = require("../../repository/type-orm-time-slot-minute.repository");
let CreateTimeSlotMinutesHandler = exports.CreateTimeSlotMinutesHandler = class CreateTimeSlotMinutesHandler {
    typeOrmTimeSlotMinuteRepository;
    commandBus;
    constructor(typeOrmTimeSlotMinuteRepository, commandBus) {
        this.typeOrmTimeSlotMinuteRepository = typeOrmTimeSlotMinuteRepository;
        this.commandBus = commandBus;
    }
    async execute(command) {
        const { input } = command;
        const { id: timeSlotId } = input.timeSlot;
        const timeMinute = await this.typeOrmTimeSlotMinuteRepository.findOneBy({
            timeSlotId: timeSlotId,
            datetime: input.datetime
        });
        if (timeMinute) {
            return this.commandBus.execute(new update_time_slot_minutes_command_1.UpdateTimeSlotMinutesCommand(timeMinute.id, {
                ...input,
                timeSlotId: timeMinute.id
            }));
        }
        else {
            input.tenantId = context_1.RequestContext.currentTenantId();
            return this.typeOrmTimeSlotMinuteRepository.save(input);
        }
    }
};
exports.CreateTimeSlotMinutesHandler = CreateTimeSlotMinutesHandler = __decorate([
    (0, cqrs_1.CommandHandler)(create_time_slot_minutes_command_1.CreateTimeSlotMinutesCommand),
    __param(0, (0, typeorm_1.InjectRepository)(time_slot_minute_entity_1.TimeSlotMinute)),
    __metadata("design:paramtypes", [type_orm_time_slot_minute_repository_1.TypeOrmTimeSlotMinuteRepository,
        cqrs_1.CommandBus])
], CreateTimeSlotMinutesHandler);
//# sourceMappingURL=create-time-slot-minutes.handler.js.map
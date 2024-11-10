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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSlotMinute = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("./../../core/entities/internal");
const entity_1 = require("./../../core/decorators/entity");
const time_slot_entity_1 = require("./time-slot.entity");
const mikro_orm_time_slot_minute_repository_1 = require("./repository/mikro-orm-time-slot-minute.repository");
let TimeSlotMinute = exports.TimeSlotMinute = class TimeSlotMinute extends internal_1.TenantOrganizationBaseEntity {
    keyboard;
    mouse;
    datetime;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    timeSlot;
    timeSlotId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ default: 0 }),
    __metadata("design:type", Number)
], TimeSlotMinute.prototype, "keyboard", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ default: 0 }),
    __metadata("design:type", Number)
], TimeSlotMinute.prototype, "mouse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => 'timestamptz' }),
    (0, class_validator_1.IsDateString)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Date)
], TimeSlotMinute.prototype, "datetime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => time_slot_entity_1.TimeSlot }),
    (0, entity_1.MultiORMManyToOne)(() => time_slot_entity_1.TimeSlot, (it) => it.timeSlotMinutes, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], TimeSlotMinute.prototype, "timeSlot", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, typeorm_1.RelationId)((it) => it.timeSlot),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], TimeSlotMinute.prototype, "timeSlotId", void 0);
exports.TimeSlotMinute = TimeSlotMinute = __decorate([
    (0, entity_1.MultiORMEntity)('time_slot_minute', { mikroOrmRepository: () => mikro_orm_time_slot_minute_repository_1.MikroOrmTimeSlotMinuteRepository }),
    (0, typeorm_1.Unique)(['timeSlotId', 'datetime'])
], TimeSlotMinute);
//# sourceMappingURL=time-slot-minute.entity.js.map
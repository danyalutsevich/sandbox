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
exports.TimeSlot = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const internal_1 = require("./../../core/entities/internal");
const time_slot_minute_entity_1 = require("./time-slot-minute.entity");
const entity_1 = require("./../../core/decorators/entity");
const mikro_orm_time_slot_repository_1 = require("./repository/mikro-orm-time-slot.repository");
let TimeSlot = exports.TimeSlot = class TimeSlot extends internal_1.TenantOrganizationBaseEntity {
    duration;
    keyboard;
    mouse;
    overall;
    startedAt;
    /** Additional virtual columns */
    stoppedAt;
    percentage;
    keyboardPercentage;
    mousePercentage;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Employee
     */
    employee;
    employeeId;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    /**
     * Screenshot
     */
    screenshots;
    /**
     * Activity
     */
    activities;
    /**
     * TimeSlotMinute
     */
    timeSlotMinutes;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    /**
     * TimeLog
     */
    timeLogs;
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ default: 0 }),
    __metadata("design:type", Number)
], TimeSlot.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ default: 0 }),
    __metadata("design:type", Number)
], TimeSlot.prototype, "keyboard", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ default: 0 }),
    __metadata("design:type", Number)
], TimeSlot.prototype, "mouse", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ default: 0 }),
    __metadata("design:type", Number)
], TimeSlot.prototype, "overall", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => 'timestamptz' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Date)
], TimeSlot.prototype, "startedAt", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", Date)
], TimeSlot.prototype, "stoppedAt", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", Number)
], TimeSlot.prototype, "percentage", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", Number)
], TimeSlot.prototype, "keyboardPercentage", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", Number)
], TimeSlot.prototype, "mousePercentage", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Employee, (it) => it.timeSlots, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], TimeSlot.prototype, "employee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.employee),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", Object)
], TimeSlot.prototype, "employeeId", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Screenshot, (it) => it.timeSlot),
    __metadata("design:type", Array)
], TimeSlot.prototype, "screenshots", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Activity, (it) => it.timeSlot, {
        cascade: true
    }),
    __metadata("design:type", Array)
], TimeSlot.prototype, "activities", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => time_slot_minute_entity_1.TimeSlotMinute, (it) => it.timeSlot, {
        cascade: true
    }),
    __metadata("design:type", Array)
], TimeSlot.prototype, "timeSlotMinutes", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.TimeLog, (it) => it.timeSlots, {
        /**  Database cascade action on update. */
        onUpdate: 'CASCADE',
        /** Database cascade action on delete. */
        onDelete: 'CASCADE',
        /** This column is a boolean flag indicating whether the current entity is the 'owning' side of a relationship.  */
        owner: true,
        /** Pivot table for many-to-many relationship. */
        pivotTable: 'time_slot_time_logs',
        /** Column in pivot table referencing 'time_slot' primary key. */
        joinColumn: 'timeSlotId',
        /** Column in pivot table referencing 'time_logs' primary key. */
        inverseJoinColumn: 'timeLogId'
    }),
    (0, typeorm_1.JoinTable)({ name: 'time_slot_time_logs' }),
    __metadata("design:type", Array)
], TimeSlot.prototype, "timeLogs", void 0);
exports.TimeSlot = TimeSlot = __decorate([
    (0, entity_1.MultiORMEntity)('time_slot', { mikroOrmRepository: () => mikro_orm_time_slot_repository_1.MikroOrmTimeSlotRepository })
], TimeSlot);
//# sourceMappingURL=time-slot.entity.js.map
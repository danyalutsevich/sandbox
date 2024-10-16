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
exports.Timesheet = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const contracts_1 = require("../../../plugins/contracts");
const internal_1 = require("./../../core/entities/internal");
const entity_1 = require("./../../core/decorators/entity");
const mikro_orm_timesheet_repository_1 = require("./repository/mikro-orm-timesheet.repository");
let Timesheet = exports.Timesheet = class Timesheet extends internal_1.TenantOrganizationBaseEntity {
    duration;
    keyboard;
    mouse;
    overall;
    startedAt;
    stoppedAt;
    approvedAt;
    submittedAt;
    lockedAt;
    /**
     * Edited timestamp column
     */
    editedAt;
    isBilled;
    status;
    /** Additional virtual columns */
    /**
     * Indicates whether the Timesheet has been edited.
     * If the value is true, it means the Timesheet has been edited.
     * If the value is false or undefined, it means the Timesheet has not been edited.
     */
    isEdited;
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
    /**
     * Approve By User
     */
    approvedBy;
    approvedById;
    /**
     * Called after entity is loaded.
     */
    afterLoadEntity() {
        /**
         * Sets the 'isEdited' property based on the presence of 'editedAt'.
         * If 'editedAt' is defined, 'isEdited' is set to true; otherwise, it is set to false.
         */
        if ('editedAt' in this) {
            this.isEdited = !!this.editedAt;
        }
    }
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ default: 0 }),
    __metadata("design:type", Number)
], Timesheet.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ default: 0 }),
    __metadata("design:type", Number)
], Timesheet.prototype, "keyboard", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ default: 0 }),
    __metadata("design:type", Number)
], Timesheet.prototype, "mouse", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ default: 0 }),
    __metadata("design:type", Number)
], Timesheet.prototype, "overall", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => 'timestamptz' }),
    (0, class_validator_1.IsDateString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Timesheet.prototype, "startedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => 'timestamptz' }),
    (0, class_validator_1.IsDateString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Timesheet.prototype, "stoppedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => 'timestamptz' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Timesheet.prototype, "approvedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => 'timestamptz' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Timesheet.prototype, "submittedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => 'timestamptz' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Timesheet.prototype, "lockedAt", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ type: 'timestamp' }),
    (0, class_validator_1.IsDateString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Timesheet.prototype, "editedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], Timesheet.prototype, "isBilled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, enum: contracts_1.TimesheetStatus, default: contracts_1.TimesheetStatus.PENDING }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contracts_1.TimesheetStatus),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ default: contracts_1.TimesheetStatus.PENDING }),
    __metadata("design:type", String)
], Timesheet.prototype, "status", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", Boolean)
], Timesheet.prototype, "isEdited", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Employee, (it) => it.timesheets, {
        /** Database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Timesheet.prototype, "employee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.employee),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", Object)
], Timesheet.prototype, "employeeId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.User, {
        /** Indicates if the relation column value can be nullable or not. */
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Timesheet.prototype, "approvedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.approvedBy),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], Timesheet.prototype, "approvedById", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Timesheet.prototype, "afterLoadEntity", null);
exports.Timesheet = Timesheet = __decorate([
    (0, entity_1.MultiORMEntity)('timesheet', { mikroOrmRepository: () => mikro_orm_timesheet_repository_1.MikroOrmTimesheetRepository })
], Timesheet);
//# sourceMappingURL=timesheet.entity.js.map
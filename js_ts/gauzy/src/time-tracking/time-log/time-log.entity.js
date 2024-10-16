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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeLog = void 0;
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("@mikro-orm/core");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const moment_1 = __importDefault(require("moment"));
const contracts_1 = require("../../../plugins/contracts");
const index_1 = require("../../../plugins/config/dist/index");
const internal_1 = require("./../../core/entities/internal");
const entity_1 = require("../../core/decorators/entity");
const mikro_orm_time_log_repository_1 = require("./repository/mikro-orm-time-log.repository");
let TimeLog = exports.TimeLog = class TimeLog extends internal_1.TenantOrganizationBaseEntity {
    startedAt;
    stoppedAt;
    /**
     * Edited timestamp column
     */
    editedAt;
    logType;
    source;
    description;
    reason;
    isBillable;
    isRunning;
    version;
    /** Additional virtual columns */
    duration;
    /**
     * Indicates whether the TimeLog has been edited.
     * If the value is true, it means the TimeLog has been edited.
     * If the value is false or undefined, it means the TimeLog has not been edited.
     */
    isEdited;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Employee relationship
     */
    employee;
    employeeId;
    /**
     * Timesheet relationship
     */
    timesheet;
    timesheetId;
    /**
     * Organization Project Relationship
     */
    project;
    /**
     * Organization Project ID
     */
    projectId;
    /**
     * Task
     */
    task;
    taskId;
    /**
     * OrganizationContact
     */
    organizationContact;
    organizationContactId;
    /**
     * Organization Team
     */
    organizationTeam;
    organizationTeamId;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    /**
     * TimeSlot
     */
    timeSlots;
    /*
    |--------------------------------------------------------------------------
    | @EventSubscriber
    |--------------------------------------------------------------------------
    */
    /**
     * Called after entity is loaded.
     */
    afterEntityLoad() {
        const startedAt = (0, moment_1.default)(this.startedAt, 'YYYY-MM-DD HH:mm:ss');
        const stoppedAt = (0, moment_1.default)(this.stoppedAt || new Date(), 'YYYY-MM-DD HH:mm:ss');
        this.duration = stoppedAt.diff(startedAt, 'seconds');
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
    (0, swagger_1.ApiProperty)({ type: () => 'timestamptz' }),
    (0, class_validator_1.IsDateString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], TimeLog.prototype, "startedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => 'timestamptz' }),
    (0, class_validator_1.IsDateString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], TimeLog.prototype, "stoppedAt", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ type: 'timestamp' }),
    (0, class_validator_1.IsDateString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], TimeLog.prototype, "editedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: contracts_1.TimeLogType, default: contracts_1.TimeLogType.TRACKED }),
    (0, class_validator_1.IsEnum)(contracts_1.TimeLogType),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ default: contracts_1.TimeLogType.TRACKED }),
    __metadata("design:type", String)
], TimeLog.prototype, "logType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: contracts_1.TimeLogSourceEnum, default: contracts_1.TimeLogSourceEnum.WEB_TIMER }),
    (0, class_validator_1.IsEnum)(contracts_1.TimeLogSourceEnum),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ default: contracts_1.TimeLogSourceEnum.WEB_TIMER }),
    __metadata("design:type", String)
], TimeLog.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        ...((0, index_1.isMySQL)() ? { type: 'longtext' } : {})
    }),
    __metadata("design:type", String)
], TimeLog.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], TimeLog.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], TimeLog.prototype, "isBillable", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], TimeLog.prototype, "isRunning", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ update: false, nullable: true }),
    __metadata("design:type", String)
], TimeLog.prototype, "version", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", Number)
], TimeLog.prototype, "duration", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", Boolean)
], TimeLog.prototype, "isEdited", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Employee, (it) => it.timeLogs, {
        /** Database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], TimeLog.prototype, "employee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.employee),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", Object)
], TimeLog.prototype, "employeeId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Timesheet, {
        /** Indicates if the relation column value can be nullable or not. */
        nullable: true,
        /** Database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], TimeLog.prototype, "timesheet", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.timesheet),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], TimeLog.prototype, "timesheetId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationProject, (it) => it.timeLogs, {
        /** Indicates if the relation column value can be nullable or not. */
        nullable: true,
        /** Defines the database cascade action on delete. */
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], TimeLog.prototype, "project", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.project),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], TimeLog.prototype, "projectId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Task, (it) => it.timeLogs, {
        /** Indicates if the relation column value can be nullable or not. */
        nullable: true,
        /** Defines the database cascade action on delete. */
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], TimeLog.prototype, "task", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.task),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], TimeLog.prototype, "taskId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationContact, (it) => it.timeLogs, {
        /** Indicates if the relation column value can be nullable or not. */
        nullable: true,
        /** Defines the database cascade action on delete. */
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], TimeLog.prototype, "organizationContact", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.organizationContact),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], TimeLog.prototype, "organizationContactId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationTeam, {
        /** Indicates if the relation column value can be nullable or not. */
        nullable: true,
        /** Defines the database cascade action on delete. */
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], TimeLog.prototype, "organizationTeam", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.organizationTeam),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], TimeLog.prototype, "organizationTeamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.TimeSlot, isArray: true }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.TimeSlot, (it) => it.timeLogs, {
        /** Database cascade action on update. */
        onUpdate: 'CASCADE',
        /** Database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], TimeLog.prototype, "timeSlots", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    (0, core_1.OnLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TimeLog.prototype, "afterEntityLoad", null);
exports.TimeLog = TimeLog = __decorate([
    (0, entity_1.MultiORMEntity)('time_log', { mikroOrmRepository: () => mikro_orm_time_log_repository_1.MikroOrmTimeLogRepository })
], TimeLog);
//# sourceMappingURL=time-log.entity.js.map
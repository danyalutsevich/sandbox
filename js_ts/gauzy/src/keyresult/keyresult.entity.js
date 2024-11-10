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
exports.KeyResult = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/contracts/dist/index");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_keyresult_repository_1 = require("./repository/mikro-orm-keyresult.repository");
let KeyResult = exports.KeyResult = class KeyResult extends internal_1.TenantOrganizationBaseEntity {
    name;
    description;
    type;
    targetValue;
    initialValue;
    unit;
    update;
    progress;
    deadline;
    hardDeadline;
    softDeadline;
    status;
    weight;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Owner Employee
     */
    owner;
    ownerId;
    /**
     * Lead Employee
     */
    lead;
    leadId;
    /**
     * Organization Project
     */
    project;
    projectId;
    /**
     * Task
     */
    task;
    taskId;
    /**
     * GoalKPI
     */
    kpi;
    kpiId;
    /**
     * Goal
     */
    goal;
    goalId;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    updates;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], KeyResult.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], KeyResult.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.KeyResultTypeEnum }),
    (0, class_validator_1.IsEnum)(index_1.KeyResultTypeEnum),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], KeyResult.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], KeyResult.prototype, "targetValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], KeyResult.prototype, "initialValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], KeyResult.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Number)
], KeyResult.prototype, "update", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Number)
], KeyResult.prototype, "progress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.KeyResultDeadlineEnum }),
    (0, class_validator_1.IsEnum)(index_1.KeyResultDeadlineEnum),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], KeyResult.prototype, "deadline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], KeyResult.prototype, "hardDeadline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], KeyResult.prototype, "softDeadline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], KeyResult.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], KeyResult.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Employee }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Employee),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], KeyResult.prototype, "owner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.owner),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], KeyResult.prototype, "ownerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Employee }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Employee, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], KeyResult.prototype, "lead", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.lead),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], KeyResult.prototype, "leadId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.OrganizationProject }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationProject, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'projectId' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], KeyResult.prototype, "project", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, typeorm_1.RelationId)((it) => it.project),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], KeyResult.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Task }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Task, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'taskId' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], KeyResult.prototype, "task", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, typeorm_1.RelationId)((it) => it.task),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], KeyResult.prototype, "taskId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.GoalKPI }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.GoalKPI, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'kpiId' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], KeyResult.prototype, "kpi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, typeorm_1.RelationId)((it) => it.kpi),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], KeyResult.prototype, "kpiId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Goal }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Goal, (goal) => goal.keyResults, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)({ name: 'goalId' }),
    __metadata("design:type", Object)
], KeyResult.prototype, "goal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, typeorm_1.RelationId)((it) => it.goal),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], KeyResult.prototype, "goalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.KeyResultUpdate }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.KeyResultUpdate, (keyResultUpdate) => keyResultUpdate.keyResult, {
        cascade: true
    }),
    __metadata("design:type", Array)
], KeyResult.prototype, "updates", void 0);
exports.KeyResult = KeyResult = __decorate([
    (0, entity_1.MultiORMEntity)('key_result', { mikroOrmRepository: () => mikro_orm_keyresult_repository_1.MikroOrmKeyResultRepository })
], KeyResult);
//# sourceMappingURL=keyresult.entity.js.map
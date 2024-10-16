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
exports.Goal = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_goal_repository_1 = require("./repository/mikro-orm-goal.repository");
let Goal = exports.Goal = class Goal extends internal_1.TenantOrganizationBaseEntity {
    name;
    description;
    deadline;
    level;
    progress;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * OrganizationTeam
     */
    ownerTeam;
    ownerTeamId;
    /**
     * Owner Employee
     */
    ownerEmployee;
    ownerEmployeeId;
    /**
     * Lead Employee
     */
    lead;
    leadId;
    /**
     * KeyResult
     */
    alignedKeyResult;
    alignedKeyResultId;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    /**
     * KeyResult
     */
    keyResults;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Goal.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Goal.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Goal.prototype, "deadline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.GoalLevelEnum }),
    (0, class_validator_1.IsEnum)(index_1.GoalLevelEnum),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Goal.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Number)
], Goal.prototype, "progress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.OrganizationTeam }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationTeam, (team) => team.goals, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], Goal.prototype, "ownerTeam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.ownerTeam),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Goal.prototype, "ownerTeamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Employee }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Employee, (employee) => employee.goals, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], Goal.prototype, "ownerEmployee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.ownerEmployee),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Goal.prototype, "ownerEmployeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Employee }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Employee, (employee) => employee.leads, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], Goal.prototype, "lead", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.lead),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Goal.prototype, "leadId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.KeyResult }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.KeyResult, (keyResult) => keyResult.id),
    __metadata("design:type", Object)
], Goal.prototype, "alignedKeyResult", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.alignedKeyResult),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Goal.prototype, "alignedKeyResultId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.KeyResult, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.KeyResult, (keyResult) => keyResult.goal, {
        cascade: true
    }),
    __metadata("design:type", Array)
], Goal.prototype, "keyResults", void 0);
exports.Goal = Goal = __decorate([
    (0, entity_1.MultiORMEntity)('goal', { mikroOrmRepository: () => mikro_orm_goal_repository_1.MikroOrmGoalRepository })
], Goal);
//# sourceMappingURL=goal.entity.js.map
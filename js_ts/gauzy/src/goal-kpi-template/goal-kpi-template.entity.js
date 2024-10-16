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
exports.GoalKPITemplate = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/contracts/dist/index");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_goal_kpi_template_repository_1 = require("./repository/mikro-orm-goal-kpi-template.repository");
let GoalKPITemplate = exports.GoalKPITemplate = class GoalKPITemplate extends internal_1.TenantOrganizationBaseEntity {
    name;
    description;
    type;
    unit;
    operator;
    lead;
    currentValue;
    targetValue;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], GoalKPITemplate.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], GoalKPITemplate.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.KpiMetricEnum }),
    (0, entity_1.MultiORMColumn)(),
    (0, class_validator_1.IsEnum)(index_1.KpiMetricEnum),
    __metadata("design:type", String)
], GoalKPITemplate.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GoalKPITemplate.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], GoalKPITemplate.prototype, "operator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Employee }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Employee, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], GoalKPITemplate.prototype, "lead", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GoalKPITemplate.prototype, "currentValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GoalKPITemplate.prototype, "targetValue", void 0);
exports.GoalKPITemplate = GoalKPITemplate = __decorate([
    (0, entity_1.MultiORMEntity)('goal_kpi_template', { mikroOrmRepository: () => mikro_orm_goal_kpi_template_repository_1.MikroOrmGoalKPITemplateRepository })
], GoalKPITemplate);
//# sourceMappingURL=goal-kpi-template.entity.js.map
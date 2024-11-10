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
exports.KeyResultTemplate = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/contracts/dist/index");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_keyresult_template_repository_1 = require("./repository/mikro-orm-keyresult-template.repository");
let KeyResultTemplate = exports.KeyResultTemplate = class KeyResultTemplate extends internal_1.TenantOrganizationBaseEntity {
    name;
    type;
    unit;
    targetValue;
    initialValue;
    deadline;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    kpi;
    kpiId;
    goal;
    goalId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], KeyResultTemplate.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.KeyResultTypeEnum }),
    (0, class_validator_1.IsEnum)(index_1.KeyResultTypeEnum),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], KeyResultTemplate.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], KeyResultTemplate.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], KeyResultTemplate.prototype, "targetValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], KeyResultTemplate.prototype, "initialValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.KeyResultDeadlineEnum }),
    (0, class_validator_1.IsEnum)(index_1.KeyResultDeadlineEnum),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], KeyResultTemplate.prototype, "deadline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.GoalKPITemplate }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.GoalKPITemplate, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'kpiId' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], KeyResultTemplate.prototype, "kpi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, typeorm_1.RelationId)((it) => it.kpi),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], KeyResultTemplate.prototype, "kpiId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.GoalTemplate }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.GoalTemplate, (goalTemplate) => goalTemplate.keyResults, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)({ name: 'goalId' }),
    __metadata("design:type", Object)
], KeyResultTemplate.prototype, "goal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, typeorm_1.RelationId)((it) => it.goal),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], KeyResultTemplate.prototype, "goalId", void 0);
exports.KeyResultTemplate = KeyResultTemplate = __decorate([
    (0, entity_1.MultiORMEntity)('key_result_template', { mikroOrmRepository: () => mikro_orm_keyresult_template_repository_1.MikroOrmKeyResultTemplateRepository })
], KeyResultTemplate);
//# sourceMappingURL=keyresult-template.entity.js.map
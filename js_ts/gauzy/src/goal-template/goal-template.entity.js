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
exports.GoalTemplate = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_goal_template_repository_1 = require("./repository/mikro-orm-goal-template.repository");
let GoalTemplate = exports.GoalTemplate = class GoalTemplate extends internal_1.TenantOrganizationBaseEntity {
    name;
    level;
    category;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    keyResults;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], GoalTemplate.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.GoalLevelEnum }),
    (0, class_validator_1.IsEnum)(index_1.GoalLevelEnum),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], GoalTemplate.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.GoalTemplateCategoriesEnum }),
    (0, class_validator_1.IsEnum)(index_1.GoalTemplateCategoriesEnum),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], GoalTemplate.prototype, "category", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.KeyResultTemplate, (keyResult) => keyResult.goal),
    __metadata("design:type", Array)
], GoalTemplate.prototype, "keyResults", void 0);
exports.GoalTemplate = GoalTemplate = __decorate([
    (0, entity_1.MultiORMEntity)('goal_template', { mikroOrmRepository: () => mikro_orm_goal_template_repository_1.MikroOrmGoalTemplateRepository })
], GoalTemplate);
//# sourceMappingURL=goal-template.entity.js.map
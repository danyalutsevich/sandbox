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
exports.GoalGeneralSetting = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_goal_general_setting_repository_1 = require("./repository/mikro-orm-goal-general-setting.repository");
let GoalGeneralSetting = exports.GoalGeneralSetting = class GoalGeneralSetting extends internal_1.TenantOrganizationBaseEntity {
    maxObjectives;
    maxKeyResults;
    employeeCanCreateObjective;
    canOwnObjectives;
    canOwnKeyResult;
    krTypeKPI;
    krTypeTask;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Number)
], GoalGeneralSetting.prototype, "maxObjectives", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Number)
], GoalGeneralSetting.prototype, "maxKeyResults", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Boolean)
], GoalGeneralSetting.prototype, "employeeCanCreateObjective", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.GoalOwnershipEnum }),
    (0, class_validator_1.IsEnum)(index_1.GoalOwnershipEnum),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], GoalGeneralSetting.prototype, "canOwnObjectives", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.GoalOwnershipEnum }),
    (0, class_validator_1.IsEnum)(index_1.GoalOwnershipEnum),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], GoalGeneralSetting.prototype, "canOwnKeyResult", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Boolean)
], GoalGeneralSetting.prototype, "krTypeKPI", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Boolean)
], GoalGeneralSetting.prototype, "krTypeTask", void 0);
exports.GoalGeneralSetting = GoalGeneralSetting = __decorate([
    (0, entity_1.MultiORMEntity)('goal_general_setting', { mikroOrmRepository: () => mikro_orm_goal_general_setting_repository_1.MikroOrmGoalGeneralSettingRepository })
], GoalGeneralSetting);
//# sourceMappingURL=goal-general-setting.entity.js.map
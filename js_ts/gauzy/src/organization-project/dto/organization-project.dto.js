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
exports.OrganizationProjectDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const contracts_1 = require("../../../plugins/contracts");
const class_validator_1 = require("class-validator");
const organization_project_entity_1 = require("./../organization-project.entity");
const update_task_mode_dto_1 = require("./update-task-mode.dto");
class OrganizationProjectDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.PickType)(organization_project_entity_1.OrganizationProject, ['imageId']), (0, swagger_1.PartialType)(update_task_mode_dto_1.UpdateTaskModeDTO)) {
    name;
    billing;
    budgetType;
}
exports.OrganizationProjectDTO = OrganizationProjectDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrganizationProjectDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: contracts_1.ProjectBillingEnum,
        example: contracts_1.ProjectBillingEnum.FLAT_FEE
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contracts_1.ProjectBillingEnum),
    __metadata("design:type", String)
], OrganizationProjectDTO.prototype, "billing", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: contracts_1.OrganizationProjectBudgetTypeEnum,
        example: contracts_1.OrganizationProjectBudgetTypeEnum.COST
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contracts_1.OrganizationProjectBudgetTypeEnum),
    __metadata("design:type", String)
], OrganizationProjectDTO.prototype, "budgetType", void 0);
//# sourceMappingURL=organization-project.dto.js.map
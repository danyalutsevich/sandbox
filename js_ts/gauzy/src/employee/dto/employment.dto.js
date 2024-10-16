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
exports.EmploymentDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const dto_1 = require("./../../organization-employment-type/dto");
const dto_2 = require("./../../organization-department/dto");
const dto_3 = require("./../../core/dto");
class EmploymentDTO extends dto_3.TenantOrganizationBaseDTO {
    startedWorkOn;
    endWork;
    short_description;
    description;
    anonymousBonus;
    organizationEmploymentTypes;
    organizationDepartments;
    employeeLevel;
    organizationPosition;
    skills;
}
exports.EmploymentDTO = EmploymentDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], EmploymentDTO.prototype, "startedWorkOn", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], EmploymentDTO.prototype, "endWork", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmploymentDTO.prototype, "short_description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmploymentDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EmploymentDTO.prototype, "anonymousBonus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Array, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => dto_1.CreateOrganizationEmploymentTypeDTO),
    __metadata("design:type", Array)
], EmploymentDTO.prototype, "organizationEmploymentTypes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Array, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => dto_2.CreateOrganizationDepartmentDTO),
    __metadata("design:type", Array)
], EmploymentDTO.prototype, "organizationDepartments", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EmploymentDTO.prototype, "employeeLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Object }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], EmploymentDTO.prototype, "organizationPosition", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Array, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], EmploymentDTO.prototype, "skills", void 0);
//# sourceMappingURL=employment.dto.js.map
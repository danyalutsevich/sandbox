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
exports.OrganizationContactDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const contracts_1 = require("../../../plugins/contracts");
const organization_contact_entity_1 = require("./../organization-contact.entity");
const dto_1 = require("../../core/dto");
const trim_decorator_1 = require("../../shared/decorators/trim.decorator");
class OrganizationContactDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.PickType)(organization_contact_entity_1.OrganizationContact, ['imageId']), dto_1.TenantOrganizationBaseDTO) {
    name;
    primaryEmail;
    primaryPhone;
    inviteStatus;
    notes;
    contactType;
    imageUrl;
    budget;
    budgetType;
    createdBy;
}
exports.OrganizationContactDTO = OrganizationContactDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrganizationContactDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, trim_decorator_1.Trimmed)(),
    __metadata("design:type", String)
], OrganizationContactDTO.prototype, "primaryEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrganizationContactDTO.prototype, "primaryPhone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, enum: contracts_1.ContactOrganizationInviteStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contracts_1.ContactOrganizationInviteStatus),
    __metadata("design:type", String)
], OrganizationContactDTO.prototype, "inviteStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrganizationContactDTO.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: contracts_1.ContactType }),
    (0, class_validator_1.IsEnum)(contracts_1.ContactType),
    __metadata("design:type", String)
], OrganizationContactDTO.prototype, "contactType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, maxLength: 500 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], OrganizationContactDTO.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrganizationContactDTO.prototype, "budget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, enum: contracts_1.OrganizationContactBudgetTypeEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contracts_1.OrganizationContactBudgetTypeEnum),
    __metadata("design:type", String)
], OrganizationContactDTO.prototype, "budgetType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrganizationContactDTO.prototype, "createdBy", void 0);
//# sourceMappingURL=organization-contact.dto.js.map
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
exports.PublicOrganizationQueryDTO = exports.OrganizationRelationEnum = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
/**
 * Get public organization request DTO validation
 */
var OrganizationRelationEnum;
(function (OrganizationRelationEnum) {
    OrganizationRelationEnum["image"] = "image";
    OrganizationRelationEnum["skills"] = "skills";
    OrganizationRelationEnum["awards"] = "awards";
    OrganizationRelationEnum["languages"] = "languages";
    OrganizationRelationEnum["languages.language"] = "languages.language";
})(OrganizationRelationEnum || (exports.OrganizationRelationEnum = OrganizationRelationEnum = {}));
class PublicOrganizationQueryDTO {
    relations;
}
exports.PublicOrganizationQueryDTO = PublicOrganizationQueryDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, enum: OrganizationRelationEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(OrganizationRelationEnum, { each: true }),
    __metadata("design:type", Array)
], PublicOrganizationQueryDTO.prototype, "relations", void 0);
//# sourceMappingURL=public-organization-query.dto.js.map
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
exports.OrganizationTeamDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dto_1 = require("./../../core/dto");
const dto_2 = require("./../../tags/dto");
const organization_team_entity_1 = require("./../organization-team.entity");
const organization_project_entity_1 = require("../../organization-project/organization-project.entity");
class OrganizationTeamDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.IntersectionType)(dto_1.TenantOrganizationBaseDTO, (0, swagger_1.PartialType)(dto_2.RelationalTagDTO)), (0, swagger_1.PickType)(organization_team_entity_1.OrganizationTeam, ['logo', 'prefix', 'imageId', 'shareProfileView', 'requirePlanToTrack'])) {
    /**
     * Team type should be boolean true/false
     */
    public;
    color;
    emoji;
    teamSize;
    memberIds = [];
    managerIds = [];
    projects = [];
}
exports.OrganizationTeamDTO = OrganizationTeamDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], OrganizationTeamDTO.prototype, "public", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrganizationTeamDTO.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrganizationTeamDTO.prototype, "emoji", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrganizationTeamDTO.prototype, "teamSize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], OrganizationTeamDTO.prototype, "memberIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], OrganizationTeamDTO.prototype, "managerIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => organization_project_entity_1.OrganizationProject, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], OrganizationTeamDTO.prototype, "projects", void 0);
//# sourceMappingURL=organization-team.dto.js.map
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
exports.UpdateOrganizationTeamDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const organization_team_dto_1 = require("./organization-team.dto");
const validators_1 = require("./../../shared/validators");
/**
 * Update organization team request DTO's
 */
class UpdateOrganizationTeamDTO extends organization_team_dto_1.OrganizationTeamDTO {
    id;
    name;
}
exports.UpdateOrganizationTeamDTO = UpdateOrganizationTeamDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateOrganizationTeamDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, validators_1.IsTeamAlreadyExist)(),
    __metadata("design:type", String)
], UpdateOrganizationTeamDTO.prototype, "name", void 0);
//# sourceMappingURL=update-organization-team.dto.js.map
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
exports.InviteDTO = void 0;
const contracts_1 = require("../../../plugins/contracts");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dto_1 = require("./../../core/dto");
/**
 * Invite DTO validation
 */
class InviteDTO extends dto_1.TenantOrganizationBaseDTO {
    emailIds = [];
    teamIds = [];
    inviteType;
    startedWorkOn;
    invitationExpirationPeriod;
    fullName;
    callbackUrl;
}
exports.InviteDTO = InviteDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Array }),
    (0, class_validator_1.ArrayNotEmpty)(),
    __metadata("design:type", Array)
], InviteDTO.prototype, "emailIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Array }),
    (0, class_validator_1.ValidateIf)((it) => it.inviteType === contracts_1.InvitationTypeEnum.TEAM),
    (0, class_validator_1.ArrayNotEmpty)(),
    __metadata("design:type", Array)
], InviteDTO.prototype, "teamIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: contracts_1.InvitationTypeEnum }),
    (0, class_validator_1.IsEnum)(contracts_1.InvitationTypeEnum),
    __metadata("design:type", String)
], InviteDTO.prototype, "inviteType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], InviteDTO.prototype, "startedWorkOn", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, enum: contracts_1.InvitationExpirationEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contracts_1.InvitationExpirationEnum),
    __metadata("design:type", Object)
], InviteDTO.prototype, "invitationExpirationPeriod", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InviteDTO.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    __metadata("design:type", String)
], InviteDTO.prototype, "callbackUrl", void 0);
//# sourceMappingURL=invite.dto.js.map
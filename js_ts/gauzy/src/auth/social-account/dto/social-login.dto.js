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
exports.FindUserBySocialLoginDTO = exports.SocialLoginBodyRequestDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const contracts_1 = require("../../../../plugins/contracts");
const include_teams_dto_1 = require("../../../user/dto/include-teams.dto");
/**
 * Validate the social login body request
 */
class SocialLoginBodyRequestDTO extends include_teams_dto_1.IncludeTeamsDTO {
    provider;
    token;
}
exports.SocialLoginBodyRequestDTO = SocialLoginBodyRequestDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(contracts_1.ProviderEnum, { message: 'provider `$value` must be a valid enum value' }),
    __metadata("design:type", String)
], SocialLoginBodyRequestDTO.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SocialLoginBodyRequestDTO.prototype, "token", void 0);
class FindUserBySocialLoginDTO extends (0, swagger_1.PickType)(SocialLoginBodyRequestDTO, ['provider']) {
    providerAccountId;
}
exports.FindUserBySocialLoginDTO = FindUserBySocialLoginDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindUserBySocialLoginDTO.prototype, "providerAccountId", void 0);
//# sourceMappingURL=social-login.dto.js.map
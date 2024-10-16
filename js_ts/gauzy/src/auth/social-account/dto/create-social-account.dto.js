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
exports.CreateSocialAccountDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const index_1 = require("../../../../plugins/contracts/dist/index");
const dto_1 = require("../../../core/dto");
const dto_2 = require("../../../user/dto");
/**
 * Create Social Account DTO validation
 */
class CreateSocialAccountDTO extends (0, swagger_1.IntersectionType)(dto_1.TenantBaseDTO) {
    /**
     * Create user to the social account
     */
    user;
    /**
     * Sync user to the social account
     */
    userId;
    provider;
    providerAccountId;
}
exports.CreateSocialAccountDTO = CreateSocialAccountDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => dto_2.CreateUserDTO }),
    (0, class_validator_1.ValidateIf)((it) => !it.userId),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => dto_2.CreateUserDTO),
    __metadata("design:type", dto_2.CreateUserDTO)
], CreateSocialAccountDTO.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.ValidateIf)((it) => !it.user),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateSocialAccountDTO.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(index_1.ProviderEnum, { message: 'provider `$value` must be a valid enum value' }),
    __metadata("design:type", String)
], CreateSocialAccountDTO.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSocialAccountDTO.prototype, "providerAccountId", void 0);
//# sourceMappingURL=create-social-account.dto.js.map
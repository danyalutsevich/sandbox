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
exports.CreateUserDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const contracts_1 = require("../../../plugins/contracts");
const trim_decorator_1 = require("../../shared/decorators/trim.decorator");
const dto_1 = require("./../../role/dto");
const user_email_dto_1 = require("./user-email.dto");
/**
 * DTO (Data Transfer Object) for creating a user.
 * Extends UserEmailDTO and includes partial RoleFeatureDTO.
 */
class CreateUserDTO extends (0, swagger_1.IntersectionType)(user_email_dto_1.UserEmailDTO, (0, swagger_1.PartialType)(dto_1.RoleFeatureDTO)) {
    /**
     * Optional: User's first name.
     */
    firstName;
    /**
     * User's last name.
     */
    lastName;
    /**
     * Optional: User's image URL.
     */
    imageUrl;
    /**
     * Optional: Preferred language for the user.
     */
    preferredLanguage;
}
exports.CreateUserDTO = CreateUserDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, trim_decorator_1.Trimmed)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, trim_decorator_1.Trimmed)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, enum: contracts_1.LanguagesEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contracts_1.LanguagesEnum),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "preferredLanguage", void 0);
//# sourceMappingURL=create-user.dto.js.map
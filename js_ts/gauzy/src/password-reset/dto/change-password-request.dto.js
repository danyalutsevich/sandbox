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
exports.ChangePasswordRequestDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const validators_1 = require("./../../shared/validators");
/**
 * Change Password Request DTO validation
 */
class ChangePasswordRequestDTO {
    token;
    password;
    confirmPassword;
}
exports.ChangePasswordRequestDTO = ChangePasswordRequestDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Authorization token is invalid or missing.'
    }),
    (0, class_validator_1.IsString)({
        message: 'Authorization token must be string.'
    }),
    __metadata("design:type", String)
], ChangePasswordRequestDTO.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)({ message: "Password should not be empty" }),
    (0, class_validator_1.MinLength)(4, {
        message: 'Password should be at least 4 characters long.'
    }),
    __metadata("design:type", String)
], ChangePasswordRequestDTO.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)({ message: "Confirm password should not be empty" }),
    (0, validators_1.Match)(ChangePasswordRequestDTO, (it) => it.password, {
        message: 'The password and confirmation password must match.'
    }),
    __metadata("design:type", String)
], ChangePasswordRequestDTO.prototype, "confirmPassword", void 0);
//# sourceMappingURL=change-password-request.dto.js.map
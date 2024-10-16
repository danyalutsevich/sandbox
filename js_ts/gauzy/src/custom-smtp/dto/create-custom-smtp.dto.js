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
exports.CreateCustomSmtpDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const custom_smtp_entity_1 = require("./../custom-smtp.entity");
const custom_smtp_query_dto_1 = require("./custom-smtp.query.dto");
/**
 * Create custom SMTP Request DTO validation
 */
class CreateCustomSmtpDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.PickType)(custom_smtp_entity_1.CustomSmtp, ['fromAddress', 'host', 'port', 'secure', 'isValidate']), custom_smtp_query_dto_1.CustomSmtpQueryDTO) {
    username;
    password;
}
exports.CreateCustomSmtpDTO = CreateCustomSmtpDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomSmtpDTO.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomSmtpDTO.prototype, "password", void 0);
//# sourceMappingURL=create-custom-smtp.dto.js.map
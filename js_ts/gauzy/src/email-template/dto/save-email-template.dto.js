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
exports.SaveEmailTemplateDTO = void 0;
const contracts_1 = require("../../../plugins/contracts");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dto_1 = require("../../core/dto");
/**
 * Save email template request DTO validation
 */
class SaveEmailTemplateDTO extends dto_1.TenantOrganizationBaseDTO {
    languageCode;
    name;
    mjml;
    subject;
}
exports.SaveEmailTemplateDTO = SaveEmailTemplateDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: contracts_1.LanguagesEnum }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SaveEmailTemplateDTO.prototype, "languageCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: contracts_1.EmailTemplateEnum }),
    (0, class_validator_1.IsEnum)(contracts_1.EmailTemplateEnum),
    __metadata("design:type", String)
], SaveEmailTemplateDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SaveEmailTemplateDTO.prototype, "mjml", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SaveEmailTemplateDTO.prototype, "subject", void 0);
//# sourceMappingURL=save-email-template.dto.js.map
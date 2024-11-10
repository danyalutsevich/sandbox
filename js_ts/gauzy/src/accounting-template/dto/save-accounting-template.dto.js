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
exports.SaveAccountingTemplateDTO = void 0;
const contracts_1 = require("../../../plugins/contracts");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dto_1 = require("./../../core/dto");
/**
 * Save accounting template request DTO validation
 */
class SaveAccountingTemplateDTO extends dto_1.TenantOrganizationBaseDTO {
    languageCode;
    templateType;
    mjml;
}
exports.SaveAccountingTemplateDTO = SaveAccountingTemplateDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: contracts_1.LanguagesEnum, readOnly: true }),
    (0, class_validator_1.IsEnum)(contracts_1.LanguagesEnum),
    __metadata("design:type", String)
], SaveAccountingTemplateDTO.prototype, "languageCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: contracts_1.AccountingTemplateTypeEnum, readOnly: true }),
    (0, class_validator_1.IsEnum)(contracts_1.AccountingTemplateTypeEnum),
    __metadata("design:type", String)
], SaveAccountingTemplateDTO.prototype, "templateType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SaveAccountingTemplateDTO.prototype, "mjml", void 0);
//# sourceMappingURL=save-accounting-template.dto.js.map
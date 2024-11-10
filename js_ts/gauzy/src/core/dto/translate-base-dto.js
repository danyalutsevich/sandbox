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
exports.TranslatableBaseDTO = exports.TranslationBaseDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const tenant_organization_base_dto_1 = require("./tenant-organization-base.dto");
class TranslationBaseDTO extends tenant_organization_base_dto_1.TenantOrganizationBaseDTO {
    name;
    description;
    languageCode;
}
exports.TranslationBaseDTO = TranslationBaseDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TranslationBaseDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TranslationBaseDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TranslationBaseDTO.prototype, "languageCode", void 0);
class TranslatableBaseDTO extends tenant_organization_base_dto_1.TenantOrganizationBaseDTO {
    translations;
    translate;
    translateNested;
}
exports.TranslatableBaseDTO = TranslatableBaseDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Array, isArray: true }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TranslationBaseDTO),
    __metadata("design:type", Object)
], TranslatableBaseDTO.prototype, "translations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Function }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Function)
], TranslatableBaseDTO.prototype, "translate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Function }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Function)
], TranslatableBaseDTO.prototype, "translateNested", void 0);
//# sourceMappingURL=translate-base-dto.js.map
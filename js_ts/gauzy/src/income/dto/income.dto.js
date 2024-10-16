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
exports.IncomeDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const dto_1 = require("./../../core/dto");
class IncomeDTO extends dto_1.TenantOrganizationBaseDTO {
    clientId;
    amount;
    valueDate;
    notes;
    isBonus;
    reference;
}
exports.IncomeDTO = IncomeDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IncomeDTO.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, readOnly: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], IncomeDTO.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], IncomeDTO.prototype, "valueDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], IncomeDTO.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)((params) => ((params.value) || false)),
    __metadata("design:type", Boolean)
], IncomeDTO.prototype, "isBonus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, maxLength: 256, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], IncomeDTO.prototype, "reference", void 0);
//# sourceMappingURL=income.dto.js.map
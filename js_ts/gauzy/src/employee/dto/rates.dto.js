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
exports.RatesDTO = void 0;
const contracts_1 = require("../../../plugins/contracts");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const dto_1 = require("./../../core/dto");
/**
 * Update Employee/Candidate Rates DTO
 */
class RatesDTO extends dto_1.TenantOrganizationBaseDTO {
    payPeriod;
    billRateValue;
    minimumBillingRate;
    reWeeklyLimit;
    billRateCurrency;
}
exports.RatesDTO = RatesDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, enum: contracts_1.PayPeriodEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contracts_1.PayPeriodEnum),
    __metadata("design:type", String)
], RatesDTO.prototype, "payPeriod", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)((params) => parseInt(params.value || 0, 10)),
    __metadata("design:type", Number)
], RatesDTO.prototype, "billRateValue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)((params) => parseInt(params.value || 0, 10)),
    __metadata("design:type", Number)
], RatesDTO.prototype, "minimumBillingRate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)((params) => parseInt(params.value || 0, 10)),
    __metadata("design:type", Number)
], RatesDTO.prototype, "reWeeklyLimit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, enum: contracts_1.CurrenciesEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contracts_1.CurrenciesEnum),
    __metadata("design:type", String)
], RatesDTO.prototype, "billRateCurrency", void 0);
//# sourceMappingURL=rates.dto.js.map
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
exports.InvoiceDTO = void 0;
const contracts_1 = require("../../../plugins/contracts");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const dto_1 = require("./../../core/dto");
const dto_2 = require("./../../invoice-estimate-history/dto");
const dto_3 = require("./../../invoice-item/dto");
class InvoiceDTO extends dto_1.TenantOrganizationBaseDTO {
    invoiceNumber;
    invoiceDate;
    dueDate;
    status;
    totalValue;
    currency;
    paid;
    terms;
    organizationContactId;
    organizationContactName;
    isEstimate;
    isAccepted;
    internalNote;
    alreadyPaid;
    amountDue;
    hasRemainingAmountInvoiced;
    isArchived;
    toContact;
    toContactId;
    invoiceItems;
    payments;
    historyRecords;
}
exports.InvoiceDTO = InvoiceDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, readOnly: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InvoiceDTO.prototype, "invoiceNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date, readOnly: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], InvoiceDTO.prototype, "invoiceDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date, readOnly: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], InvoiceDTO.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: Object.assign({}, contracts_1.InvoiceStatusTypesEnum, contracts_1.EstimateStatusTypesEnum), readOnly: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(Object.assign({}, contracts_1.InvoiceStatusTypesEnum, contracts_1.EstimateStatusTypesEnum)),
    __metadata("design:type", String)
], InvoiceDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InvoiceDTO.prototype, "totalValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: contracts_1.CurrenciesEnum, readOnly: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(contracts_1.CurrenciesEnum),
    __metadata("design:type", String)
], InvoiceDTO.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], InvoiceDTO.prototype, "paid", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvoiceDTO.prototype, "terms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvoiceDTO.prototype, "organizationContactId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvoiceDTO.prototype, "organizationContactName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], InvoiceDTO.prototype, "isEstimate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], InvoiceDTO.prototype, "isAccepted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvoiceDTO.prototype, "internalNote", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InvoiceDTO.prototype, "alreadyPaid", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InvoiceDTO.prototype, "amountDue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], InvoiceDTO.prototype, "hasRemainingAmountInvoiced", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], InvoiceDTO.prototype, "isArchived", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Object }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], InvoiceDTO.prototype, "toContact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvoiceDTO.prototype, "toContactId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Array, isArray: true, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => dto_3.CreateInvoiceItemDTO),
    __metadata("design:type", Array)
], InvoiceDTO.prototype, "invoiceItems", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Array, isArray: true, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], InvoiceDTO.prototype, "payments", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Array, isArray: true, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => dto_2.CreateInvoiceEstimateHistoryDTO),
    __metadata("design:type", Array)
], InvoiceDTO.prototype, "historyRecords", void 0);
//# sourceMappingURL=invoice.dto.js.map
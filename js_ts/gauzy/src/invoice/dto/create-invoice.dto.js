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
exports.CreateInvoiceDTO = void 0;
const contracts_1 = require("../../../plugins/contracts");
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dto_1 = require("./../../tags/dto");
const discount_invoice_dto_1 = require("./discount-invoice.dto");
const invoice_dto_1 = require("./invoice.dto");
const tax_invoice_dto_1 = require("./tax-invoice.dto");
class CreateInvoiceDTO extends (0, mapped_types_1.IntersectionType)(invoice_dto_1.InvoiceDTO, tax_invoice_dto_1.TaxInvoiceDTO, dto_1.RelationalTagDTO, discount_invoice_dto_1.DiscountInvoiceDTO) {
    fromOrganization;
    fromOrganizationId;
    invoiceType;
}
exports.CreateInvoiceDTO = CreateInvoiceDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Object, readOnly: true }),
    (0, class_validator_1.ValidateIf)((it) => !it.fromOrganizationId),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateInvoiceDTO.prototype, "fromOrganization", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.ValidateIf)((it) => !it.fromOrganization),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInvoiceDTO.prototype, "fromOrganizationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInvoiceDTO.prototype, "sentTo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, enum: contracts_1.InvoiceTypeEnum, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contracts_1.InvoiceTypeEnum),
    __metadata("design:type", String)
], CreateInvoiceDTO.prototype, "invoiceType", void 0);
//# sourceMappingURL=create-invoice.dto.js.map
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
exports.PaymentDTO = void 0;
const contracts_1 = require("../../../plugins/contracts");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dto_1 = require("./../../core/dto");
class PaymentDTO extends dto_1.TenantOrganizationBaseDTO {
    paymentDate;
    amount;
    overdue;
    note;
    paymentMethod;
    invoice;
    invoiceId;
    project;
    projectId;
    organizationContact;
    organizationContactId;
}
exports.PaymentDTO = PaymentDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], PaymentDTO.prototype, "paymentDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, readOnly: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], PaymentDTO.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PaymentDTO.prototype, "overdue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaymentDTO.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: contracts_1.PaymentMethodEnum, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contracts_1.PaymentMethodEnum),
    __metadata("design:type", String)
], PaymentDTO.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], PaymentDTO.prototype, "invoice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaymentDTO.prototype, "invoiceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Object, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], PaymentDTO.prototype, "project", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaymentDTO.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Object, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], PaymentDTO.prototype, "organizationContact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaymentDTO.prototype, "organizationContactId", void 0);
//# sourceMappingURL=payment.dto.js.map
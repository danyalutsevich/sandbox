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
exports.Invoice = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/config/dist/index");
const pipes_1 = require("./../shared/pipes");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_invoice_repository_1 = require("./repository/mikro-orm-invoice.repository");
let Invoice = exports.Invoice = class Invoice extends internal_1.TenantOrganizationBaseEntity {
    invoiceDate;
    invoiceNumber;
    dueDate;
    currency;
    discountValue;
    paid;
    tax;
    tax2;
    terms;
    totalValue;
    status;
    isEstimate;
    isAccepted;
    discountType;
    taxType;
    tax2Type;
    invoiceType;
    sentTo;
    organizationContactId;
    internalNote;
    alreadyPaid;
    amountDue;
    hasRemainingAmountInvoiced;
    token;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    // From Organization
    fromOrganization;
    fromOrganizationId;
    // To Contact
    toContact;
    toContactId;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    // Invoice Estimate Items
    invoiceItems;
    // Invoice Estimate Payments
    payments;
    // Invoice Estimate History
    historyRecords;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    tags;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date }),
    (0, class_validator_1.IsDate)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Invoice.prototype, "invoiceDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        transformer: new pipes_1.ColumnNumericTransformerPipe(),
        ...((0, index_2.isMySQL)() ? { type: 'bigint' } : { type: 'numeric' })
    }),
    __metadata("design:type", Number)
], Invoice.prototype, "invoiceNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date }),
    (0, class_validator_1.IsDate)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Invoice.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.CurrenciesEnum }),
    (0, class_validator_1.IsEnum)(index_1.CurrenciesEnum),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Invoice.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({
        type: 'numeric',
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], Invoice.prototype, "discountValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean }),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ type: Boolean, nullable: true }),
    __metadata("design:type", Boolean)
], Invoice.prototype, "paid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        type: 'numeric',
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], Invoice.prototype, "tax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        type: 'numeric',
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], Invoice.prototype, "tax2", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Invoice.prototype, "terms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        type: 'numeric',
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], Invoice.prototype, "totalValue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Invoice.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ type: Boolean, nullable: true }),
    __metadata("design:type", Boolean)
], Invoice.prototype, "isEstimate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ type: Boolean, nullable: true }),
    __metadata("design:type", Boolean)
], Invoice.prototype, "isAccepted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.DiscountTaxTypeEnum }),
    (0, class_validator_1.IsEnum)(index_1.DiscountTaxTypeEnum),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Invoice.prototype, "discountType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.DiscountTaxTypeEnum }),
    (0, class_validator_1.IsEnum)(index_1.DiscountTaxTypeEnum),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Invoice.prototype, "taxType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.DiscountTaxTypeEnum }),
    (0, class_validator_1.IsEnum)(index_1.DiscountTaxTypeEnum),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Invoice.prototype, "tax2Type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, enum: index_1.InvoiceTypeEnum }),
    (0, class_validator_1.IsEnum)(index_1.InvoiceTypeEnum),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Invoice.prototype, "invoiceType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Invoice.prototype, "sentTo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Invoice.prototype, "organizationContactId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Invoice.prototype, "internalNote", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        type: 'numeric',
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], Invoice.prototype, "alreadyPaid", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        type: 'numeric',
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], Invoice.prototype, "amountDue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ type: Boolean, nullable: true }),
    __metadata("design:type", Boolean)
], Invoice.prototype, "hasRemainingAmountInvoiced", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        ...((0, index_2.isMySQL)() ? { type: "text" } : {})
    }),
    __metadata("design:type", String)
], Invoice.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => () => internal_1.Organization }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Organization),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Invoice.prototype, "fromOrganization", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.fromOrganization),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], Invoice.prototype, "fromOrganizationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => () => internal_1.OrganizationContact }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationContact, (contact) => contact.invoices, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Invoice.prototype, "toContact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.toContact),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Invoice.prototype, "toContactId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.InvoiceItem, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.InvoiceItem, (invoiceItem) => invoiceItem.invoice, {
        cascade: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Invoice.prototype, "invoiceItems", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.Payment, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Payment, (payment) => payment.invoice),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Invoice.prototype, "payments", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.InvoiceEstimateHistory, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.InvoiceEstimateHistory, (invoiceEstimateHistory) => invoiceEstimateHistory.invoice, {
        cascade: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Invoice.prototype, "historyRecords", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Tag }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Tag, (tag) => tag.invoices, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'tag_invoice',
        joinColumn: 'invoiceId',
        inverseJoinColumn: 'tagId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'tag_invoice'
    }),
    __metadata("design:type", Array)
], Invoice.prototype, "tags", void 0);
exports.Invoice = Invoice = __decorate([
    (0, entity_1.MultiORMEntity)('invoice', { mikroOrmRepository: () => mikro_orm_invoice_repository_1.MikroOrmInvoiceRepository }),
    (0, typeorm_1.Unique)(['invoiceNumber'])
], Invoice);
//# sourceMappingURL=invoice.entity.js.map
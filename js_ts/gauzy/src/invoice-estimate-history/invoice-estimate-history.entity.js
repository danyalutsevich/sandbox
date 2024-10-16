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
exports.InvoiceEstimateHistory = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_invoice_estimate_history_repository_1 = require("./repository/mikro-orm-invoice-estimate-history.repository");
let InvoiceEstimateHistory = exports.InvoiceEstimateHistory = class InvoiceEstimateHistory extends internal_1.TenantOrganizationBaseEntity {
    action;
    title;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    user;
    userId;
    invoice;
    invoiceId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], InvoiceEstimateHistory.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: () => String, required: false }),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], InvoiceEstimateHistory.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.User }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.User, {
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", internal_1.User)
], InvoiceEstimateHistory.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.user),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], InvoiceEstimateHistory.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Invoice }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Invoice, (invoice) => invoice.invoiceItems, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Object)
], InvoiceEstimateHistory.prototype, "invoice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.invoice),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], InvoiceEstimateHistory.prototype, "invoiceId", void 0);
exports.InvoiceEstimateHistory = InvoiceEstimateHistory = __decorate([
    (0, entity_1.MultiORMEntity)('invoice_estimate_history', { mikroOrmRepository: () => mikro_orm_invoice_estimate_history_repository_1.MikroOrmInvoiceEstimateHistoryRepository })
], InvoiceEstimateHistory);
//# sourceMappingURL=invoice-estimate-history.entity.js.map
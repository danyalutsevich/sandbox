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
exports.Expense = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const index_1 = require("../../plugins/contracts/dist/index");
const internal_1 = require("../core/entities/internal");
const pipes_1 = require("./../shared/pipes");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_expense_repository_1 = require("./repository/mikro-orm-expense.repository");
let Expense = exports.Expense = class Expense extends internal_1.TenantOrganizationBaseEntity {
    amount;
    typeOfExpense;
    notes;
    currency;
    valueDate;
    purpose;
    taxType;
    taxLabel;
    rateValue;
    receipt;
    splitExpense;
    reference;
    status;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Employee
     */
    employee;
    employeeId;
    /**
     * OrganizationVendor
     */
    vendor;
    vendorId;
    /**
     * ExpenseCategory
     */
    category;
    categoryId;
    /**
     * Organization Project Relationship
     */
    project;
    /**
     * Organization Project ID
     */
    projectId;
    /**
     * OrganizationContact
     */
    organizationContact;
    organizationContactId;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * InvoiceItem
     */
    invoiceItems;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    /**
     * Tag
     */
    tags;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({
        type: 'numeric',
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], Expense.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Expense.prototype, "typeOfExpense", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, entity_1.ColumnIndex)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Expense.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.CurrenciesEnum }),
    (0, class_validator_1.IsEnum)(index_1.CurrenciesEnum),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Expense.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Expense.prototype, "valueDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, entity_1.ColumnIndex)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Expense.prototype, "purpose", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, entity_1.ColumnIndex)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Expense.prototype, "taxType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, entity_1.ColumnIndex)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Expense.prototype, "taxLabel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.ColumnIndex)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        type: 'numeric',
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], Expense.prototype, "rateValue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, entity_1.ColumnIndex)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Expense.prototype, "receipt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Expense.prototype, "splitExpense", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, maxLength: 256 }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Expense.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, enum: index_1.ExpenseStatusesEnum }),
    (0, entity_1.MultiORMColumn)({
        type: 'simple-enum',
        nullable: true,
        enum: index_1.ExpenseStatusesEnum
    }),
    __metadata("design:type", String)
], Expense.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Employee }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Employee, (employee) => employee.expenses, {
        nullable: true,
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Expense.prototype, "employee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, typeorm_1.RelationId)((it) => it.employee),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Expense.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.OrganizationVendor }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationVendor, (vendor) => vendor.expenses, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Expense.prototype, "vendor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, typeorm_1.RelationId)((it) => it.vendor),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Expense.prototype, "vendorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.ExpenseCategory }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.ExpenseCategory, (category) => category.expenses, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Expense.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, typeorm_1.RelationId)((it) => it.category),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Expense.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.OrganizationProject }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationProject, (project) => project.expenses, {
        /** Indicates if the relation column value can be nullable or not. */
        nullable: true,
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Expense.prototype, "project", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.project),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Expense.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.OrganizationContact }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationContact, (contact) => contact.expenses, {
        nullable: true,
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Expense.prototype, "organizationContact", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.organizationContact),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Expense.prototype, "organizationContactId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.InvoiceItem, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.InvoiceItem, (invoiceItem) => invoiceItem.expense, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Expense.prototype, "invoiceItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Tag, isArray: true }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Tag, (tag) => tag.expenses, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'tag_expense',
        joinColumn: 'expenseId',
        inverseJoinColumn: 'tagId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'tag_expense'
    }),
    __metadata("design:type", Array)
], Expense.prototype, "tags", void 0);
exports.Expense = Expense = __decorate([
    (0, entity_1.MultiORMEntity)('expense', { mikroOrmRepository: () => mikro_orm_expense_repository_1.MikroOrmExpenseRepository })
], Expense);
//# sourceMappingURL=expense.entity.js.map
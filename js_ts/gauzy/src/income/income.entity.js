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
exports.Income = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const index_1 = require("../../plugins/contracts/dist/index");
const internal_1 = require("../core/entities/internal");
const pipes_1 = require("./../shared/pipes");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_income_repository_1 = require("./repository/mikro-orm-income.repository");
let Income = exports.Income = class Income extends internal_1.TenantOrganizationBaseEntity {
    amount;
    currency;
    valueDate;
    notes;
    isBonus;
    reference;
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
     * Client
     */
    client;
    clientId;
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
], Income.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.CurrenciesEnum }),
    (0, class_validator_1.IsEnum)(index_1.CurrenciesEnum),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Income.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Income.prototype, "valueDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, entity_1.ColumnIndex)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Income.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Income.prototype, "isBonus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, maxLength: 256 }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Income.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Employee }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Employee, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Income.prototype, "employee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, typeorm_1.RelationId)((it) => it.employee),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Income.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => () => internal_1.OrganizationContact }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationContact, (organizationContact) => organizationContact.incomes, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Income.prototype, "client", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.client),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Income.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => () => internal_1.Tag, isArray: true }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Tag, (tag) => tag.incomes, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'tag_income',
        joinColumn: 'incomeId',
        inverseJoinColumn: 'tagId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'tag_income'
    }),
    __metadata("design:type", Array)
], Income.prototype, "tags", void 0);
exports.Income = Income = __decorate([
    (0, entity_1.MultiORMEntity)('income', { mikroOrmRepository: () => mikro_orm_income_repository_1.MikroOrmIncomeRepository })
], Income);
//# sourceMappingURL=income.entity.js.map
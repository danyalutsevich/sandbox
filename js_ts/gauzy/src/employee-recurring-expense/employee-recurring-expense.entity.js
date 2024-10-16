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
exports.EmployeeRecurringExpense = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const internal_1 = require("../core/entities/internal");
const pipes_1 = require("./../shared/pipes");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_employee_recurring_expense_repository_1 = require("./repository/mikro-orm-employee-recurring-expense.repository");
let EmployeeRecurringExpense = exports.EmployeeRecurringExpense = class EmployeeRecurringExpense extends internal_1.TenantOrganizationBaseEntity {
    startDay;
    startMonth;
    startYear;
    startDate;
    endDay;
    endMonth;
    endYear;
    endDate;
    categoryName;
    value;
    currency;
    parentRecurringExpenseId;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    employee;
    employeeId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, minimum: 1, maximum: 31 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(31),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Number)
], EmployeeRecurringExpense.prototype, "startDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, minimum: 1, maximum: 12 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Number)
], EmployeeRecurringExpense.prototype, "startMonth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, minimum: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(0),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Number)
], EmployeeRecurringExpense.prototype, "startYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date }),
    (0, class_validator_1.IsDate)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Date)
], EmployeeRecurringExpense.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, minimum: 1, maximum: 31 }),
    (0, class_validator_1.IsNumber)(),
    (0, common_1.Optional)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(31),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], EmployeeRecurringExpense.prototype, "endDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, minimum: 1, maximum: 12 }),
    (0, class_validator_1.IsNumber)(),
    (0, common_1.Optional)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], EmployeeRecurringExpense.prototype, "endMonth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, minimum: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, common_1.Optional)(),
    (0, class_validator_1.Min)(0),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], EmployeeRecurringExpense.prototype, "endYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], EmployeeRecurringExpense.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], EmployeeRecurringExpense.prototype, "categoryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.MultiORMColumn)({
        type: 'numeric',
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], EmployeeRecurringExpense.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.CurrenciesEnum }),
    (0, class_validator_1.IsEnum)(index_1.CurrenciesEnum),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], EmployeeRecurringExpense.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], EmployeeRecurringExpense.prototype, "parentRecurringExpenseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Employee }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Employee, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], EmployeeRecurringExpense.prototype, "employee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.employee),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], EmployeeRecurringExpense.prototype, "employeeId", void 0);
exports.EmployeeRecurringExpense = EmployeeRecurringExpense = __decorate([
    (0, entity_1.MultiORMEntity)('employee_recurring_expense', { mikroOrmRepository: () => mikro_orm_employee_recurring_expense_repository_1.MikroOrmEmployeeRecurringExpenseRepository })
], EmployeeRecurringExpense);
//# sourceMappingURL=employee-recurring-expense.entity.js.map
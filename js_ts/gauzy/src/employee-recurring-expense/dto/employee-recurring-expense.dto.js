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
exports.EmployeeRecurringExpenseDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dto_1 = require("./../../core/dto");
class EmployeeRecurringExpenseDTO extends dto_1.TenantOrganizationBaseDTO {
    value;
    categoryName;
    startDay;
    startMonth;
    startYear;
    startDate;
    endDay;
    endMonth;
    endYear;
    endDate;
    parentRecurringExpenseId;
}
exports.EmployeeRecurringExpenseDTO = EmployeeRecurringExpenseDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, readOnly: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EmployeeRecurringExpenseDTO.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployeeRecurringExpenseDTO.prototype, "categoryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, minimum: 1, maximum: 31, readOnly: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(31),
    __metadata("design:type", Number)
], EmployeeRecurringExpenseDTO.prototype, "startDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, minimum: 1, maximum: 12, readOnly: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Number)
], EmployeeRecurringExpenseDTO.prototype, "startMonth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, minimum: 1, readOnly: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], EmployeeRecurringExpenseDTO.prototype, "startYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date, readOnly: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], EmployeeRecurringExpenseDTO.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, minimum: 1, maximum: 31, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(31),
    __metadata("design:type", Number)
], EmployeeRecurringExpenseDTO.prototype, "endDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, minimum: 1, maximum: 12, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Number)
], EmployeeRecurringExpenseDTO.prototype, "endMonth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, minimum: 1, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], EmployeeRecurringExpenseDTO.prototype, "endYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], EmployeeRecurringExpenseDTO.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployeeRecurringExpenseDTO.prototype, "parentRecurringExpenseId", void 0);
//# sourceMappingURL=employee-recurring-expense.dto.js.map
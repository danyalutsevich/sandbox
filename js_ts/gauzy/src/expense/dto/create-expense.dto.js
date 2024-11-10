"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateExpenseDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./../../tags/dto");
const dto_2 = require("./../../employee/dto");
const dto_3 = require("./../../organization-vendor/dto");
const expense_dto_1 = require("./expense.dto");
const dto_4 = require("currency/dto");
/**
 * Create Expense DTO request validation
 */
class CreateExpenseDTO extends (0, mapped_types_1.IntersectionType)(expense_dto_1.ExpenseDTO, dto_3.OrganizationVendorFeatureDTO, (0, swagger_1.PartialType)(dto_2.EmployeeFeatureDTO), (0, mapped_types_1.IntersectionType)(dto_1.RelationalTagDTO, dto_4.RelationalCurrencyDTO)) {
}
exports.CreateExpenseDTO = CreateExpenseDTO;
//# sourceMappingURL=create-expense.dto.js.map
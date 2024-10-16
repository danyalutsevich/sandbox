"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEmployeeRecurringExpenseDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const dto_1 = require("./../../employee/dto");
const dto_2 = require("./../../currency/dto");
const employee_recurring_expense_dto_1 = require("./employee-recurring-expense.dto");
class CreateEmployeeRecurringExpenseDTO extends (0, mapped_types_1.IntersectionType)(employee_recurring_expense_dto_1.EmployeeRecurringExpenseDTO, dto_1.EmployeeFeatureDTO, dto_2.RelationalCurrencyDTO) {
}
exports.CreateEmployeeRecurringExpenseDTO = CreateEmployeeRecurringExpenseDTO;
//# sourceMappingURL=create-employee-recurring-expense.dto.js.map
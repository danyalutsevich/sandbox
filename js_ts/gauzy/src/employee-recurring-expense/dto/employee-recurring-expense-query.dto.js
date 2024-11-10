"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRecurringExpenseQueryDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const dto_1 = require("./../../employee/dto");
const dto_2 = require("./../../shared/dto");
class EmployeeRecurringExpenseQueryDTO extends (0, mapped_types_1.IntersectionType)(dto_1.EmployeeFeatureDTO, dto_2.DateRangeQueryDTO, dto_2.RelationsQueryDTO) {
}
exports.EmployeeRecurringExpenseQueryDTO = EmployeeRecurringExpenseQueryDTO;
//# sourceMappingURL=employee-recurring-expense-query.dto.js.map
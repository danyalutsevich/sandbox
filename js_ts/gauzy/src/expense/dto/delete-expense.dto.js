"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteExpenseDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const dto_1 = require("./../../employee/dto");
const expense_dto_1 = require("./expense.dto");
/**
 * Delete expense request DTO validation
 */
class DeleteExpenseDTO extends (0, mapped_types_1.IntersectionType)((0, mapped_types_1.PickType)(expense_dto_1.ExpenseDTO, ['organization', 'organizationId']), (0, mapped_types_1.PartialType)(dto_1.EmployeeFeatureDTO)) {
}
exports.DeleteExpenseDTO = DeleteExpenseDTO;
//# sourceMappingURL=delete-expense.dto.js.map
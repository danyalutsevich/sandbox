"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExpenseDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const dto_1 = require("./../../currency/dto");
const dto_2 = require("organization-vendor/dto");
const dto_3 = require("./../../tags/dto");
const expense_dto_1 = require("./expense.dto");
/**
 * Update Expense DTO request validation
 */
class UpdateExpenseDTO extends (0, mapped_types_1.IntersectionType)(expense_dto_1.ExpenseDTO, dto_2.OrganizationVendorFeatureDTO, (0, mapped_types_1.IntersectionType)(dto_3.RelationalTagDTO, dto_1.RelationalCurrencyDTO)) {
}
exports.UpdateExpenseDTO = UpdateExpenseDTO;
//# sourceMappingURL=update-expense.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateExpenseCategoryDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const dto_1 = require("../../tags/dto");
const expense_category_dto_1 = require("./expense-category.dto");
/**
 * Create expense category request validation
 */
class CreateExpenseCategoryDTO extends (0, mapped_types_1.IntersectionType)(expense_category_dto_1.ExpenseCategoryDTO, dto_1.RelationalTagDTO) {
}
exports.CreateExpenseCategoryDTO = CreateExpenseCategoryDTO;
//# sourceMappingURL=create-expense-category.dto.js.map
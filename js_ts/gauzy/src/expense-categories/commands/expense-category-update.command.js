"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseCategoryUpdateCommand = void 0;
class ExpenseCategoryUpdateCommand {
    id;
    input;
    static type = '[ExpenseCategory] Update';
    constructor(id, input) {
        this.id = id;
        this.input = input;
    }
}
exports.ExpenseCategoryUpdateCommand = ExpenseCategoryUpdateCommand;
//# sourceMappingURL=expense-category-update.command.js.map
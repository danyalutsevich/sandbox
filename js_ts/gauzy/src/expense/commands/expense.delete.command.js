"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseDeleteCommand = void 0;
class ExpenseDeleteCommand {
    employeeId;
    expenseId;
    static type = '[Expense] Delete';
    constructor(employeeId, expenseId) {
        this.employeeId = employeeId;
        this.expenseId = expenseId;
    }
}
exports.ExpenseDeleteCommand = ExpenseDeleteCommand;
//# sourceMappingURL=expense.delete.command.js.map
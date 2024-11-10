"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRecurringExpenseDeleteCommand = void 0;
class EmployeeRecurringExpenseDeleteCommand {
    id;
    deleteInput;
    static type = '[EmployeeRecurringExpense] Delete';
    constructor(id, deleteInput) {
        this.id = id;
        this.deleteInput = deleteInput;
    }
}
exports.EmployeeRecurringExpenseDeleteCommand = EmployeeRecurringExpenseDeleteCommand;
//# sourceMappingURL=employee-recurring-expense.delete.command.js.map
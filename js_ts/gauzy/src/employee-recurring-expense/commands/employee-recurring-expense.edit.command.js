"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRecurringExpenseEditCommand = void 0;
class EmployeeRecurringExpenseEditCommand {
    id;
    input;
    static type = '[EmployeeRecurringExpense] Edit';
    constructor(id, input) {
        this.id = id;
        this.input = input;
    }
}
exports.EmployeeRecurringExpenseEditCommand = EmployeeRecurringExpenseEditCommand;
//# sourceMappingURL=employee-recurring-expense.edit.command.js.map
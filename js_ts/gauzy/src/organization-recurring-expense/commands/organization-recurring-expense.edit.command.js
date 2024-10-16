"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationRecurringExpenseEditCommand = void 0;
class OrganizationRecurringExpenseEditCommand {
    id;
    input;
    static type = '[OrganizationRecurringExpense] Edit';
    constructor(id, input) {
        this.id = id;
        this.input = input;
    }
}
exports.OrganizationRecurringExpenseEditCommand = OrganizationRecurringExpenseEditCommand;
//# sourceMappingURL=organization-recurring-expense.edit.command.js.map
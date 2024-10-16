"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationRecurringExpenseDeleteCommand = void 0;
class OrganizationRecurringExpenseDeleteCommand {
    id;
    deleteInput;
    static type = '[OrganizationRecurringExpense] Delete';
    constructor(id, deleteInput) {
        this.id = id;
        this.deleteInput = deleteInput;
    }
}
exports.OrganizationRecurringExpenseDeleteCommand = OrganizationRecurringExpenseDeleteCommand;
//# sourceMappingURL=organization-recurring-expense.delete.command.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const organization_recurring_expense_delete_handler_1 = require("./organization-recurring-expense.delete.handler");
const organization_recurring_expense_edit_handler_1 = require("./organization-recurring-expense.edit.handler");
const organization_recurring_expense_create_handler_1 = require("./organization-recurring-expense.create.handler");
exports.CommandHandlers = [
    organization_recurring_expense_edit_handler_1.OrganizationRecurringExpenseEditHandler,
    organization_recurring_expense_delete_handler_1.OrganizationRecurringExpenseDeleteHandler,
    organization_recurring_expense_create_handler_1.OrganizationRecurringExpenseCreateHandler
];
//# sourceMappingURL=index.js.map
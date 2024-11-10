"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryHandlers = void 0;
const organization_recurring_expense_by_month_handler_1 = require("./organization-recurring-expense.by-month.handler");
const organization_recurring_expense_find_split_expense_handler_1 = require("./organization-recurring-expense.find-split-expense.handler");
const organization_recurring_expense_start_date_update_type_handler_1 = require("./organization-recurring-expense.start-date-update-type.handler");
exports.QueryHandlers = [
    organization_recurring_expense_by_month_handler_1.OrganizationRecurringExpenseByMonthHandler,
    organization_recurring_expense_find_split_expense_handler_1.OrganizationRecurringExpenseFindSplitExpenseHandler,
    organization_recurring_expense_start_date_update_type_handler_1.OrganizationRecurringExpenseUpdateTypeHandler
];
//# sourceMappingURL=index.js.map
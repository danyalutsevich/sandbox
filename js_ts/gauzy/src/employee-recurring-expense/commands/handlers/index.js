"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const employee_recurring_expense_delete_handler_1 = require("./employee-recurring-expense.delete.handler");
const employee_recurring_expense_edit_handler_1 = require("./employee-recurring-expense.edit.handler");
const employee_recurring_expense_create_handler_1 = require("./employee-recurring-expense.create.handler");
exports.CommandHandlers = [
    employee_recurring_expense_edit_handler_1.EmployeeRecurringExpenseEditHandler,
    employee_recurring_expense_delete_handler_1.EmployeeRecurringExpenseDeleteHandler,
    employee_recurring_expense_create_handler_1.EmployeeRecurringExpenseCreateHandler
];
//# sourceMappingURL=index.js.map
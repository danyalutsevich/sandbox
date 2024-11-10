"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const expense_create_handler_1 = require("./expense.create.handler");
const expense_delete_handler_1 = require("./expense.delete.handler");
const expense_update_handler_1 = require("./expense.update.handler");
exports.CommandHandlers = [
    expense_create_handler_1.ExpenseCreateHandler,
    expense_delete_handler_1.ExpenseDeleteHandler,
    expense_update_handler_1.ExpenseUpdateHandler
];
//# sourceMappingURL=index.js.map
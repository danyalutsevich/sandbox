"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const expense_category_create_handler_1 = require("./expense-category-create.handler");
const expense_category_first_or_create_handler_1 = require("./expense-category-first-or-create.handler");
const expense_category_update_handler_1 = require("./expense-category-update.handler");
exports.CommandHandlers = [
    expense_category_create_handler_1.ExpenseCategoryCreateHandler,
    expense_category_first_or_create_handler_1.ExpenseCategoryFirstOrCreateHandler,
    expense_category_update_handler_1.ExpenseCategoryUpdateHandler,
];
//# sourceMappingURL=index.js.map
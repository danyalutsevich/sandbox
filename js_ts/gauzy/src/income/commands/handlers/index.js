"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const income_create_handler_1 = require("./income.create.handler");
const income_delete_handler_1 = require("./income.delete.handler");
const income_update_handler_1 = require("./income.update.handler");
exports.CommandHandlers = [
    income_create_handler_1.IncomeCreateHandler,
    income_delete_handler_1.IncomeDeleteHandler,
    income_update_handler_1.IncomeUpdateHandler
];
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const user_create_handler_1 = require("./user.create.handler");
const user_delete_handler_1 = require("./user.delete.handler");
exports.CommandHandlers = [
    user_create_handler_1.UserCreateHandler,
    user_delete_handler_1.UserDeleteHandler
];
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const password_reset_create_handler_1 = require("./password-reset.create.handler");
const password_reset_get_handler_1 = require("./password-reset.get.handler");
exports.CommandHandlers = [
    password_reset_create_handler_1.PasswordResetCreateHandler,
    password_reset_get_handler_1.PasswordResetGetHandler
];
//# sourceMappingURL=index.js.map
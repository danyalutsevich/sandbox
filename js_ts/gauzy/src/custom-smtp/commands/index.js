"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = exports.CustomSmtpUpdateCommand = exports.CustomSmtpCreateCommand = void 0;
const custom_smtp_create_handler_1 = require("./handlers/custom-smtp.create.handler");
const custom_smtp_update_handler_1 = require("./handlers/custom-smtp.update.handler");
var custom_smtp_create_command_1 = require("./custom-smtp.create.command");
Object.defineProperty(exports, "CustomSmtpCreateCommand", { enumerable: true, get: function () { return custom_smtp_create_command_1.CustomSmtpCreateCommand; } });
var custom_smtp_update_command_1 = require("./custom-smtp.update.command");
Object.defineProperty(exports, "CustomSmtpUpdateCommand", { enumerable: true, get: function () { return custom_smtp_update_command_1.CustomSmtpUpdateCommand; } });
exports.CommandHandlers = [
    custom_smtp_create_handler_1.CustomSmtpCreateHandler,
    custom_smtp_update_handler_1.CustomSmtpUpdateHandler
];
//# sourceMappingURL=index.js.map
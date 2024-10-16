"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const auth_login_handler_1 = require("./auth.login.handler");
const auth_register_handler_1 = require("./auth.register.handler");
const workspace_signin_send_code_handler_1 = require("./workspace-signin-send-code.handler");
const workspace_signin_verify_token_handler_1 = require("./workspace-signin-verify-token.handler");
exports.CommandHandlers = [
    auth_login_handler_1.AuthLoginHandler,
    auth_register_handler_1.AuthRegisterHandler,
    workspace_signin_send_code_handler_1.WorkspaceSigninSendCodeCommandHandler,
    workspace_signin_verify_token_handler_1.WorkspaceSigninVerifyTokenHandler
];
//# sourceMappingURL=index.js.map
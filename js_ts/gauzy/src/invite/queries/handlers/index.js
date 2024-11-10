"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryHandlers = void 0;
const find_invite_by_email_code_handler_1 = require("./find-invite-by-email-code.handler");
const find_invite_by_email_token_handler_1 = require("./find-invite-by-email-token.handler");
exports.QueryHandlers = [
    find_invite_by_email_code_handler_1.FindInviteByEmailCodeHandler,
    find_invite_by_email_token_handler_1.FindInviteByEmailTokenHandler
];
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const approval_policy_create_handler_1 = require("./approval-policy.create.handler");
const approval_policy_get_handler_1 = require("./approval-policy.get.handler");
const approval_policy_update_handler_1 = require("./approval-policy.update.handler");
const request_approval_policy_get_handler_1 = require("./request-approval-policy.get.handler");
exports.CommandHandlers = [
    approval_policy_create_handler_1.ApprovalPolicyCreateHandler,
    approval_policy_get_handler_1.ApprovalPolicyGetHandler,
    request_approval_policy_get_handler_1.RequestApprovalPolicyGetHandler,
    approval_policy_update_handler_1.ApprovalPolicyUpdateHandler
];
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalPolicyUpdateCommand = void 0;
class ApprovalPolicyUpdateCommand {
    id;
    input;
    static type = '[ApprovalPolicy] Update';
    constructor(id, input) {
        this.id = id;
        this.input = input;
    }
}
exports.ApprovalPolicyUpdateCommand = ApprovalPolicyUpdateCommand;
//# sourceMappingURL=approval-policy.update.command.js.map
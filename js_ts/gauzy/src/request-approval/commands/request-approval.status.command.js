"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestApprovalStatusCommand = void 0;
class RequestApprovalStatusCommand {
    requestApprovalId;
    status;
    static type = '[RequestApproval] Status';
    constructor(requestApprovalId, status) {
        this.requestApprovalId = requestApprovalId;
        this.status = status;
    }
}
exports.RequestApprovalStatusCommand = RequestApprovalStatusCommand;
//# sourceMappingURL=request-approval.status.command.js.map
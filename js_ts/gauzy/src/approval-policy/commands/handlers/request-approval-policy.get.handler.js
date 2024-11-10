"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestApprovalPolicyGetHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const approval_policy_service_1 = require("../../approval-policy.service");
const request_approval_policy_get_command_1 = require("../request-approval-policy.get.command");
let RequestApprovalPolicyGetHandler = exports.RequestApprovalPolicyGetHandler = class RequestApprovalPolicyGetHandler {
    approvalPolicyService;
    constructor(approvalPolicyService) {
        this.approvalPolicyService = approvalPolicyService;
    }
    async execute(command) {
        const { input } = command;
        return this.approvalPolicyService.findApprovalPoliciesForRequestApproval(input);
    }
};
exports.RequestApprovalPolicyGetHandler = RequestApprovalPolicyGetHandler = __decorate([
    (0, cqrs_1.CommandHandler)(request_approval_policy_get_command_1.RequestApprovalPolicyGetCommand),
    __metadata("design:paramtypes", [approval_policy_service_1.ApprovalPolicyService])
], RequestApprovalPolicyGetHandler);
//# sourceMappingURL=request-approval-policy.get.handler.js.map
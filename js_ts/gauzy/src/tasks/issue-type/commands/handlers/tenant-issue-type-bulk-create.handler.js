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
exports.TenantIssueTypeBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
;
const tenant_issue_type_bulk_create_command_1 = require("../tenant-issue-type-bulk-create.command");
const issue_type_service_1 = require("../../issue-type.service");
let TenantIssueTypeBulkCreateHandler = exports.TenantIssueTypeBulkCreateHandler = class TenantIssueTypeBulkCreateHandler {
    issueTypeService;
    constructor(issueTypeService) {
        this.issueTypeService = issueTypeService;
    }
    /**
     *
     * @param command
     * @returns
     */
    async execute(command) {
        const { tenants } = command;
        // Create issue types of the tenant.
        return await this.issueTypeService.bulkCreateTenantsIssueTypes(tenants);
    }
};
exports.TenantIssueTypeBulkCreateHandler = TenantIssueTypeBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(tenant_issue_type_bulk_create_command_1.TenantIssueTypeBulkCreateCommand),
    __metadata("design:paramtypes", [issue_type_service_1.IssueTypeService])
], TenantIssueTypeBulkCreateHandler);
//# sourceMappingURL=tenant-issue-type-bulk-create.handler.js.map
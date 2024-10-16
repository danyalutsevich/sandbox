"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const organization_team_issue_type_bulk_create_handle_1 = require("./organization-team-issue-type-bulk-create.handle");
const tenant_issue_type_bulk_create_handler_1 = require("./tenant-issue-type-bulk-create.handler");
const organization_issue_type_bulk_create_handler_1 = require("./organization-issue-type-bulk-create.handler");
const organization_project_issue_type_bulk_create_handler_1 = require("./organization-project-issue-type-bulk-create.handler");
exports.CommandHandlers = [
    organization_team_issue_type_bulk_create_handle_1.OrganizationTeamIssueTypeBulkCreateHandler,
    tenant_issue_type_bulk_create_handler_1.TenantIssueTypeBulkCreateHandler,
    organization_issue_type_bulk_create_handler_1.OrganizationIssueTypeBulkCreateHandler,
    organization_project_issue_type_bulk_create_handler_1.OrganizationProjectIssueTypeBulkCreateHandler,
];
//# sourceMappingURL=index.js.map
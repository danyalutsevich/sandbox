"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const organization_project_related_issue_type_bulk_create_handler_1 = require("./organization-project-related-issue-type-bulk-create.handler");
const organization_related_issue_type_bulk_create_handler_1 = require("./organization-related-issue-type-bulk-create.handler");
const organization_team_task_related_issue_type_bulk_create_handle_1 = require("./organization-team-task-related-issue-type-bulk-create.handle");
exports.CommandHandlers = [
    organization_project_related_issue_type_bulk_create_handler_1.OrganizationProjectRelatedIssueTypeBulkCreateHandler,
    organization_related_issue_type_bulk_create_handler_1.OrganizationRelatedIssueTypeBulkCreateHandler,
    organization_team_task_related_issue_type_bulk_create_handle_1.OrganizationTeamTaskRelatedIssueTypeBulkCreateHandler,
];
//# sourceMappingURL=index.js.map
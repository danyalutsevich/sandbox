"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const organization_project_version_bulk_create_handler_1 = require("./organization-project-version-bulk-create.handler");
const organization_version_bulk_create_handler_1 = require("./organization-version-bulk-create.handler");
const organization_team_task_version_bulk_create_handle_1 = require("./organization-team-task-version-bulk-create.handle");
const tenant_version_bulk_create_handler_1 = require("./tenant-version-bulk-create.handler");
exports.CommandHandlers = [
    organization_project_version_bulk_create_handler_1.OrganizationProjectVersionBulkCreateHandler,
    organization_version_bulk_create_handler_1.OrganizationVersionBulkCreateHandler,
    organization_team_task_version_bulk_create_handle_1.OrganizationTeamTaskVersionBulkCreateHandler,
    tenant_version_bulk_create_handler_1.TenantVersionBulkCreateHandler
];
//# sourceMappingURL=index.js.map
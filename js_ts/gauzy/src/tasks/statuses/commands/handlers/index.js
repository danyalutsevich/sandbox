"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const organization_project_status_bulk_create_handler_1 = require("./organization-project-status-bulk-create.handler");
const organization_status_bulk_create_handler_1 = require("./organization-status-bulk-create.handler");
const organization_team_task_status_bulk_create_handle_1 = require("./organization-team-task-status-bulk-create.handle");
const tenant_status_bulk_create_handler_1 = require("./tenant-status-bulk-create.handler");
exports.CommandHandlers = [
    organization_project_status_bulk_create_handler_1.OrganizationProjectStatusBulkCreateHandler,
    organization_status_bulk_create_handler_1.OrganizationStatusBulkCreateHandler,
    organization_team_task_status_bulk_create_handle_1.OrganizationTeamTaskStatusBulkCreateHandler,
    tenant_status_bulk_create_handler_1.TenantStatusBulkCreateHandler
];
//# sourceMappingURL=index.js.map
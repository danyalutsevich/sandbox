"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const organization_project_task_size_bulk_create_handler_1 = require("./organization-project-task-size-bulk-create.handler");
const organization_task_size_bulk_create_handler_1 = require("./organization-task-size-bulk-create.handler");
const organization_team_task_size_bulk_create_handle_1 = require("./organization-team-task-size-bulk-create.handle");
const tenant_task_size_bulk_create_handler_1 = require("./tenant-task-size-bulk-create.handler");
exports.CommandHandlers = [
    organization_project_task_size_bulk_create_handler_1.OrganizationTaskProjectSizeBulkCreateHandler,
    organization_task_size_bulk_create_handler_1.OrganizationTaskSizeBulkCreateHandler,
    tenant_task_size_bulk_create_handler_1.TenantTaskSizeBulkCreateHandler,
    organization_team_task_size_bulk_create_handle_1.OrganizationTeamTaskSizeBulkCreateHandler
];
//# sourceMappingURL=index.js.map
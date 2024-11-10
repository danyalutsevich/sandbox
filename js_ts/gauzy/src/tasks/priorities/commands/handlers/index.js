"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const organization_project_task_priority_bulk_create_handler_1 = require("./organization-project-task-priority-bulk-create.handler");
const organization_task_priority_bulk_create_handler_1 = require("./organization-task-priority-bulk-create.handler");
const organization_team_task_priority_bulk_create_handle_1 = require("./organization-team-task-priority-bulk-create.handle");
const tenant_task_priority_bulk_create_handler_1 = require("./tenant-task-priority-bulk-create.handler");
exports.CommandHandlers = [
    organization_project_task_priority_bulk_create_handler_1.OrganizationProjectTaskPriorityBulkCreateHandler,
    organization_task_priority_bulk_create_handler_1.OrganizationTaskPriorityBulkCreateHandler,
    organization_team_task_priority_bulk_create_handle_1.OrganizationTeamTaskPriorityBulkCreateHandler,
    tenant_task_priority_bulk_create_handler_1.TenantTaskPriorityBulkCreateHandler
];
//# sourceMappingURL=index.js.map
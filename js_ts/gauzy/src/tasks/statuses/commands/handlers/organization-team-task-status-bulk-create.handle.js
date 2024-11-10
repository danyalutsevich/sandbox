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
exports.OrganizationTeamTaskStatusBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
;
const organization_team_task_status_bulk_create_command_1 = require("./../organization-team-task-status-bulk-create.command");
const status_service_1 = require("./../../status.service");
let OrganizationTeamTaskStatusBulkCreateHandler = exports.OrganizationTeamTaskStatusBulkCreateHandler = class OrganizationTeamTaskStatusBulkCreateHandler {
    taskStatusService;
    constructor(taskStatusService) {
        this.taskStatusService = taskStatusService;
    }
    async execute(command) {
        const { input } = command;
        const { id: organizationTeamId, organizationId } = input;
        /**
         * Create bulk task statuses for specific organization team
         */
        return this.taskStatusService.createBulkStatusesByEntity({ organizationId, organizationTeamId });
    }
};
exports.OrganizationTeamTaskStatusBulkCreateHandler = OrganizationTeamTaskStatusBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_team_task_status_bulk_create_command_1.OrganizationTeamTaskStatusBulkCreateCommand),
    __metadata("design:paramtypes", [status_service_1.TaskStatusService])
], OrganizationTeamTaskStatusBulkCreateHandler);
//# sourceMappingURL=organization-team-task-status-bulk-create.handle.js.map
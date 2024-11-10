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
exports.OrganizationTeamTaskPriorityBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
;
const organization_team_task_priority_bulk_create_command_1 = require("../organization-team-task-priority-bulk-create.command");
const priority_service_1 = require("./../../priority.service");
let OrganizationTeamTaskPriorityBulkCreateHandler = exports.OrganizationTeamTaskPriorityBulkCreateHandler = class OrganizationTeamTaskPriorityBulkCreateHandler {
    taskPriorityService;
    constructor(taskPriorityService) {
        this.taskPriorityService = taskPriorityService;
    }
    async execute(command) {
        const { input } = command;
        const { id: organizationTeamId, organizationId } = input;
        /**
         * Create bulk task priority for specific organization team
         */
        return await this.taskPriorityService.createBulkPrioritiesByEntity({ organizationId, organizationTeamId });
    }
};
exports.OrganizationTeamTaskPriorityBulkCreateHandler = OrganizationTeamTaskPriorityBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_team_task_priority_bulk_create_command_1.OrganizationTeamTaskPriorityBulkCreateCommand),
    __metadata("design:paramtypes", [priority_service_1.TaskPriorityService])
], OrganizationTeamTaskPriorityBulkCreateHandler);
//# sourceMappingURL=organization-team-task-priority-bulk-create.handle.js.map
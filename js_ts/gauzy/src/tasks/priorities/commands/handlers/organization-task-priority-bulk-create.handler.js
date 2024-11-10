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
exports.OrganizationTaskPriorityBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
;
const organization_task_priority_bulk_create_command_1 = require("../organization-task-priority-bulk-create.command");
const priority_service_1 = require("./../../priority.service");
let OrganizationTaskPriorityBulkCreateHandler = exports.OrganizationTaskPriorityBulkCreateHandler = class OrganizationTaskPriorityBulkCreateHandler {
    taskPriorityService;
    constructor(taskPriorityService) {
        this.taskPriorityService = taskPriorityService;
    }
    async execute(command) {
        const { input } = command;
        // Create task priorities of the organization.
        return await this.taskPriorityService.bulkCreateOrganizationTaskPriorities(input);
    }
};
exports.OrganizationTaskPriorityBulkCreateHandler = OrganizationTaskPriorityBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_task_priority_bulk_create_command_1.OrganizationTaskPriorityBulkCreateCommand),
    __metadata("design:paramtypes", [priority_service_1.TaskPriorityService])
], OrganizationTaskPriorityBulkCreateHandler);
//# sourceMappingURL=organization-task-priority-bulk-create.handler.js.map
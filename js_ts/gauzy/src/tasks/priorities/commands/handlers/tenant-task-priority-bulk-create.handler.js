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
exports.TenantTaskPriorityBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
;
const tenant_task_priority_bulk_create_command_1 = require("../tenant-task-priority-bulk-create.command");
const priority_service_1 = require("../../priority.service");
let TenantTaskPriorityBulkCreateHandler = exports.TenantTaskPriorityBulkCreateHandler = class TenantTaskPriorityBulkCreateHandler {
    taskPriorityService;
    constructor(taskPriorityService) {
        this.taskPriorityService = taskPriorityService;
    }
    async execute(command) {
        const { tenants } = command;
        // Create task priorities of the tenant.
        return await this.taskPriorityService.bulkCreateTenantsTaskPriorities(tenants);
    }
};
exports.TenantTaskPriorityBulkCreateHandler = TenantTaskPriorityBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(tenant_task_priority_bulk_create_command_1.TenantTaskPriorityBulkCreateCommand),
    __metadata("design:paramtypes", [priority_service_1.TaskPriorityService])
], TenantTaskPriorityBulkCreateHandler);
//# sourceMappingURL=tenant-task-priority-bulk-create.handler.js.map
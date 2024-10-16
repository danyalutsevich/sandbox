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
exports.TenantTaskSizeBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
;
const tenant_task_size_bulk_create_command_1 = require("../tenant-task-size-bulk-create.command");
const size_service_1 = require("../../size.service");
let TenantTaskSizeBulkCreateHandler = exports.TenantTaskSizeBulkCreateHandler = class TenantTaskSizeBulkCreateHandler {
    taskSizeService;
    constructor(taskSizeService) {
        this.taskSizeService = taskSizeService;
    }
    async execute(command) {
        const { tenants } = command;
        //1. Create task sizes of the tenant.
        return await this.taskSizeService.bulkCreateTenantsTaskSizes(tenants);
    }
};
exports.TenantTaskSizeBulkCreateHandler = TenantTaskSizeBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(tenant_task_size_bulk_create_command_1.TenantTaskSizeBulkCreateCommand),
    __metadata("design:paramtypes", [size_service_1.TaskSizeService])
], TenantTaskSizeBulkCreateHandler);
//# sourceMappingURL=tenant-task-size-bulk-create.handler.js.map
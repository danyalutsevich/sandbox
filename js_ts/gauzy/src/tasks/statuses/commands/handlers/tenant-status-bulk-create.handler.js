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
exports.TenantStatusBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
;
const tenant_status_bulk_create_command_1 = require("./../tenant-status-bulk-create.command");
const status_service_1 = require("./../../status.service");
let TenantStatusBulkCreateHandler = exports.TenantStatusBulkCreateHandler = class TenantStatusBulkCreateHandler {
    taskStatusService;
    constructor(taskStatusService) {
        this.taskStatusService = taskStatusService;
    }
    async execute(command) {
        const { tenants } = command;
        //1. Create statuses of the tenant.
        return await this.taskStatusService.bulkCreateTenantsStatus(tenants);
    }
};
exports.TenantStatusBulkCreateHandler = TenantStatusBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(tenant_status_bulk_create_command_1.TenantStatusBulkCreateCommand),
    __metadata("design:paramtypes", [status_service_1.TaskStatusService])
], TenantStatusBulkCreateHandler);
//# sourceMappingURL=tenant-status-bulk-create.handler.js.map
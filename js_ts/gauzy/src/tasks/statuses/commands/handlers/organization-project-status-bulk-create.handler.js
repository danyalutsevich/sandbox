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
exports.OrganizationProjectStatusBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
;
const organization_project_status_bulk_create_command_1 = require("./../organization-project-status-bulk-create.command");
const status_service_1 = require("./../../status.service");
let OrganizationProjectStatusBulkCreateHandler = exports.OrganizationProjectStatusBulkCreateHandler = class OrganizationProjectStatusBulkCreateHandler {
    taskStatusService;
    constructor(taskStatusService) {
        this.taskStatusService = taskStatusService;
    }
    async execute(command) {
        const { input } = command;
        const { id: projectId, organizationId } = input;
        /**
         * Create bulk task statuses for specific organization project
         */
        return await this.taskStatusService.createBulkStatusesByEntity({ organizationId, projectId });
    }
};
exports.OrganizationProjectStatusBulkCreateHandler = OrganizationProjectStatusBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_project_status_bulk_create_command_1.OrganizationProjectStatusBulkCreateCommand),
    __metadata("design:paramtypes", [status_service_1.TaskStatusService])
], OrganizationProjectStatusBulkCreateHandler);
//# sourceMappingURL=organization-project-status-bulk-create.handler.js.map
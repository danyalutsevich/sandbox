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
exports.OrganizationTaskProjectSizeBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
;
const organization_project_task_size_bulk_create_command_1 = require("../organization-project-task-size-bulk-create.command");
const size_service_1 = require("../../size.service");
let OrganizationTaskProjectSizeBulkCreateHandler = exports.OrganizationTaskProjectSizeBulkCreateHandler = class OrganizationTaskProjectSizeBulkCreateHandler {
    taskSizeService;
    constructor(taskSizeService) {
        this.taskSizeService = taskSizeService;
    }
    async execute(command) {
        const { input } = command;
        const { id: projectId, organizationId } = input;
        /**
         * Create bulk task size for specific organization team
         */
        return await this.taskSizeService.createBulkSizesByEntity({ organizationId, projectId });
    }
};
exports.OrganizationTaskProjectSizeBulkCreateHandler = OrganizationTaskProjectSizeBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_project_task_size_bulk_create_command_1.OrganizationProjectTaskSizeBulkCreateCommand),
    __metadata("design:paramtypes", [size_service_1.TaskSizeService])
], OrganizationTaskProjectSizeBulkCreateHandler);
//# sourceMappingURL=organization-project-task-size-bulk-create.handler.js.map
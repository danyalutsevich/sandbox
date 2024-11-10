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
exports.OrganizationTaskSizeBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
;
const organization_task_size_bulk_create_command_1 = require("../organization-task-size-bulk-create.command");
const size_service_1 = require("./../../size.service");
let OrganizationTaskSizeBulkCreateHandler = exports.OrganizationTaskSizeBulkCreateHandler = class OrganizationTaskSizeBulkCreateHandler {
    taskStatusService;
    constructor(taskStatusService) {
        this.taskStatusService = taskStatusService;
    }
    async execute(command) {
        const { input } = command;
        // Create task sizes of the organization.
        return await this.taskStatusService.bulkCreateOrganizationTaskSizes(input);
    }
};
exports.OrganizationTaskSizeBulkCreateHandler = OrganizationTaskSizeBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_task_size_bulk_create_command_1.OrganizationTaskSizeBulkCreateCommand),
    __metadata("design:paramtypes", [size_service_1.TaskSizeService])
], OrganizationTaskSizeBulkCreateHandler);
//# sourceMappingURL=organization-task-size-bulk-create.handler.js.map
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
exports.OrganizationProjectVersionBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
;
const organization_project_version_bulk_create_command_1 = require("../organization-project-version-bulk-create.command");
const version_service_1 = require("../../version.service");
let OrganizationProjectVersionBulkCreateHandler = exports.OrganizationProjectVersionBulkCreateHandler = class OrganizationProjectVersionBulkCreateHandler {
    taskVersionService;
    constructor(taskVersionService) {
        this.taskVersionService = taskVersionService;
    }
    async execute(command) {
        const { input } = command;
        const { id: projectId, organizationId } = input;
        /**
         * Create bulk task versions for specific organization project
         */
        return await this.taskVersionService.createBulkVersionsByEntity({
            organizationId,
            projectId
        });
    }
};
exports.OrganizationProjectVersionBulkCreateHandler = OrganizationProjectVersionBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_project_version_bulk_create_command_1.OrganizationProjectVersionBulkCreateCommand),
    __metadata("design:paramtypes", [version_service_1.TaskVersionService])
], OrganizationProjectVersionBulkCreateHandler);
//# sourceMappingURL=organization-project-version-bulk-create.handler.js.map
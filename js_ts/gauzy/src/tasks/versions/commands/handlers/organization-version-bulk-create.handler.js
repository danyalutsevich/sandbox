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
exports.OrganizationVersionBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
;
const organization_version_bulk_create_command_1 = require("../organization-version-bulk-create.command");
const version_service_1 = require("../../version.service");
let OrganizationVersionBulkCreateHandler = exports.OrganizationVersionBulkCreateHandler = class OrganizationVersionBulkCreateHandler {
    taskVersionService;
    constructor(taskVersionService) {
        this.taskVersionService = taskVersionService;
    }
    async execute(command) {
        const { input } = command;
        return await this.taskVersionService.bulkCreateOrganizationVersions(input);
    }
};
exports.OrganizationVersionBulkCreateHandler = OrganizationVersionBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_version_bulk_create_command_1.OrganizationVersionBulkCreateCommand),
    __metadata("design:paramtypes", [version_service_1.TaskVersionService])
], OrganizationVersionBulkCreateHandler);
//# sourceMappingURL=organization-version-bulk-create.handler.js.map
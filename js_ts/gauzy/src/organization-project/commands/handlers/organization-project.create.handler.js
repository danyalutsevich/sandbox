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
exports.OrganizationProjectCreateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const organization_project_create_command_1 = require("../organization-project.create.command");
const organization_project_service_1 = require("../../organization-project.service");
const commands_1 = require("./../../../tasks/statuses/commands");
const commands_2 = require("./../../../tasks/priorities/commands");
const commands_3 = require("./../../../tasks/sizes/commands");
const commands_4 = require("./../../../tasks/issue-type/commands");
let OrganizationProjectCreateHandler = exports.OrganizationProjectCreateHandler = class OrganizationProjectCreateHandler {
    _commandBus;
    _organizationProjectService;
    constructor(_commandBus, _organizationProjectService) {
        this._commandBus = _commandBus;
        this._organizationProjectService = _organizationProjectService;
    }
    async execute(command) {
        try {
            const { input } = command;
            const project = await this._organizationProjectService.create(input);
            // 1. Create task statuses for relative organization project.
            this._commandBus.execute(new commands_1.OrganizationProjectStatusBulkCreateCommand(project));
            // 2. Create task priorities for relative organization project.
            this._commandBus.execute(new commands_2.OrganizationProjectTaskPriorityBulkCreateCommand(project));
            // 3. Create task sizes for relative organization project.
            this._commandBus.execute(new commands_3.OrganizationProjectTaskSizeBulkCreateCommand(project));
            // 4. Create issue types for relative organization project.
            this._commandBus.execute(new commands_4.OrganizationProjectIssueTypeBulkCreateCommand(project));
            return project;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.OrganizationProjectCreateHandler = OrganizationProjectCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_project_create_command_1.OrganizationProjectCreateCommand),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        organization_project_service_1.OrganizationProjectService])
], OrganizationProjectCreateHandler);
//# sourceMappingURL=organization-project.create.handler.js.map
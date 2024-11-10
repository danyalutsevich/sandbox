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
exports.OrganizationTeamCreateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const organization_team_create_command_1 = require("../organization-team.create.command");
const organization_team_service_1 = require("./../../organization-team.service");
const commands_1 = require("./../../../tasks/priorities/commands");
const commands_2 = require("./../../../tasks/sizes/commands");
const commands_3 = require("./../../../tasks/statuses/commands");
const commands_4 = require("./../../../tasks/issue-type/commands");
let OrganizationTeamCreateHandler = exports.OrganizationTeamCreateHandler = class OrganizationTeamCreateHandler {
    _commandBus;
    _organizationTeamService;
    constructor(_commandBus, _organizationTeamService) {
        this._commandBus = _commandBus;
        this._organizationTeamService = _organizationTeamService;
    }
    async execute(command) {
        try {
            const { input } = command;
            const team = await this._organizationTeamService.create(input);
            // 1. Create task statuses for relative organization team.
            this._commandBus.execute(new commands_3.OrganizationTeamTaskStatusBulkCreateCommand(team));
            // 2. Create task priorities for relative organization team.
            this._commandBus.execute(new commands_1.OrganizationTeamTaskPriorityBulkCreateCommand(team));
            // 3. Create task sizes for relative organization team.
            this._commandBus.execute(new commands_2.OrganizationTeamTaskSizeBulkCreateCommand(team));
            // 4. Create issue types for relative organization team.
            this._commandBus.execute(new commands_4.OrganizationTeamIssueTypeBulkCreateCommand(team));
            return team;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.OrganizationTeamCreateHandler = OrganizationTeamCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_team_create_command_1.OrganizationTeamCreateCommand),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        organization_team_service_1.OrganizationTeamService])
], OrganizationTeamCreateHandler);
//# sourceMappingURL=organization-team.create.handler.js.map
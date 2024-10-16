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
exports.OrganizationTeamJoinRequestCreateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const organization_team_join_request_service_1 = require("../../organization-team-join-request.service");
const organization_team_join_request_create_command_1 = require("../organization-team-join-request.create.command");
let OrganizationTeamJoinRequestCreateHandler = exports.OrganizationTeamJoinRequestCreateHandler = class OrganizationTeamJoinRequestCreateHandler {
    _organizationTeamJoinRequestService;
    constructor(_organizationTeamJoinRequestService) {
        this._organizationTeamJoinRequestService = _organizationTeamJoinRequestService;
    }
    async execute(command) {
        try {
            const { input, languageCode } = command;
            await this._organizationTeamJoinRequestService.create(input, languageCode);
        }
        finally {
            return new Object({ status: common_1.HttpStatus.OK, message: `OK` });
        }
    }
};
exports.OrganizationTeamJoinRequestCreateHandler = OrganizationTeamJoinRequestCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_team_join_request_create_command_1.OrganizationTeamJoinRequestCreateCommand),
    __metadata("design:paramtypes", [organization_team_join_request_service_1.OrganizationTeamJoinRequestService])
], OrganizationTeamJoinRequestCreateHandler);
//# sourceMappingURL=organization-team-join-request.create.handler.js.map
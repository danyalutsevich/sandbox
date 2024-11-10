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
exports.GetOrganizationTeamStatisticHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const get_organization_team_statistic_query_1 = require("../get-organization-team-statistic.query");
const organization_team_service_1 = require("../../organization-team.service");
let GetOrganizationTeamStatisticHandler = exports.GetOrganizationTeamStatisticHandler = class GetOrganizationTeamStatisticHandler {
    _organizationTeamService;
    constructor(_organizationTeamService) {
        this._organizationTeamService = _organizationTeamService;
    }
    /**
    * Executes the given query to get organization team statistics.
    *
    * @param input - The query input containing parameters to fetch the team statistics.
    * @returns A promise resolving to an object representing the organization team statistics.
    * @throws SomeException - If an error occurs during execution.
    */
    async execute(input) {
        try {
            return await this._organizationTeamService.getOrganizationTeamStatistic(input);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to execute organization team statistic query`);
        }
    }
};
exports.GetOrganizationTeamStatisticHandler = GetOrganizationTeamStatisticHandler = __decorate([
    (0, cqrs_1.QueryHandler)(get_organization_team_statistic_query_1.GetOrganizationTeamStatisticQuery),
    __metadata("design:paramtypes", [organization_team_service_1.OrganizationTeamService])
], GetOrganizationTeamStatisticHandler);
//# sourceMappingURL=get-organization-team-statistic.handler.js.map
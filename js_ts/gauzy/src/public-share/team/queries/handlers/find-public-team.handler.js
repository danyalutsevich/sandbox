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
exports.FindPublicTeamHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
;
const find_public_team_query_1 = require("../find-public-team.query");
const public_team_service_1 = require("./../../public-team.service");
let FindPublicTeamHandler = exports.FindPublicTeamHandler = class FindPublicTeamHandler {
    _publicTeamService;
    constructor(_publicTeamService) {
        this._publicTeamService = _publicTeamService;
    }
    /**
     * Executes a query to find a public team by a given profile link.
     * @param query - An object containing the parameters and optional query options.
     * @returns A promise that resolves to an `IOrganizationTeam`.
     */
    async execute(query) {
        const { params, options } = query; // Extract parameters and options from the query
        return await this._publicTeamService.findOneByProfileLink(params, options); // Find the team by the profile link
    }
};
exports.FindPublicTeamHandler = FindPublicTeamHandler = __decorate([
    (0, cqrs_1.QueryHandler)(find_public_team_query_1.FindPublicTeamQuery),
    __metadata("design:paramtypes", [public_team_service_1.PublicTeamService])
], FindPublicTeamHandler);
//# sourceMappingURL=find-public-team.handler.js.map
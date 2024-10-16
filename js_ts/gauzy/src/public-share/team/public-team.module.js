"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicTeamModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const statistic_1 = require("./../../time-tracking/statistic");
const internal_1 = require("./../../core/entities/internal");
const public_team_controller_1 = require("./public-team.controller");
const public_team_service_1 = require("./public-team.service");
const handlers_1 = require("./queries/handlers");
const timer_module_1 = require("../../time-tracking/timer/timer.module");
const repository_1 = require("../../organization-team/repository");
let PublicTeamModule = exports.PublicTeamModule = class PublicTeamModule {
};
exports.PublicTeamModule = PublicTeamModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([internal_1.OrganizationTeam]),
            nestjs_1.MikroOrmModule.forFeature([internal_1.OrganizationTeam]),
            cqrs_1.CqrsModule,
            statistic_1.StatisticModule,
            timer_module_1.TimerModule
        ],
        controllers: [
            public_team_controller_1.PublicTeamController
        ],
        providers: [
            public_team_service_1.PublicTeamService,
            repository_1.TypeOrmOrganizationTeamRepository,
            ...handlers_1.QueryHandlers
        ],
        exports: []
    })
], PublicTeamModule);
//# sourceMappingURL=public-team.module.js.map
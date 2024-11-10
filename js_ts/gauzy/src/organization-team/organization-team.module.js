"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OrganizationTeamModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationTeamModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const role_module_1 = require("./../role/role.module");
const user_module_1 = require("./../user/user.module");
const employee_module_1 = require("./../employee/employee.module");
const organization_module_1 = require("./../organization/organization.module");
const organization_team_employee_module_1 = require("../organization-team-employee/organization-team-employee.module");
const organization_team_controller_1 = require("./organization-team.controller");
const organization_team_entity_1 = require("./organization-team.entity");
const organization_team_service_1 = require("./organization-team.service");
const handlers_1 = require("./queries/handlers");
const handlers_2 = require("./commands/handlers");
const timer_module_1 = require("./../time-tracking/timer/timer.module");
const statistic_module_1 = require("./../time-tracking/statistic/statistic.module");
const task_module_1 = require("./../tasks/task.module");
const repository_1 = require("./repository");
let OrganizationTeamModule = exports.OrganizationTeamModule = OrganizationTeamModule_1 = class OrganizationTeamModule {
};
exports.OrganizationTeamModule = OrganizationTeamModule = OrganizationTeamModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                { path: '/organization-team', module: OrganizationTeamModule_1 }
            ]),
            typeorm_1.TypeOrmModule.forFeature([organization_team_entity_1.OrganizationTeam]),
            nestjs_1.MikroOrmModule.forFeature([organization_team_entity_1.OrganizationTeam]),
            organization_team_employee_module_1.OrganizationTeamEmployeeModule,
            role_permission_module_1.RolePermissionModule,
            role_module_1.RoleModule,
            user_module_1.UserModule,
            organization_module_1.OrganizationModule,
            employee_module_1.EmployeeModule,
            timer_module_1.TimerModule,
            cqrs_1.CqrsModule,
            (0, common_1.forwardRef)(() => statistic_module_1.StatisticModule),
            task_module_1.TaskModule
        ],
        controllers: [organization_team_controller_1.OrganizationTeamController],
        providers: [...handlers_1.QueryHandlers, ...handlers_2.CommandHandlers, organization_team_service_1.OrganizationTeamService, repository_1.TypeOrmOrganizationTeamRepository],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, organization_team_service_1.OrganizationTeamService, repository_1.TypeOrmOrganizationTeamRepository]
    })
], OrganizationTeamModule);
//# sourceMappingURL=organization-team.module.js.map
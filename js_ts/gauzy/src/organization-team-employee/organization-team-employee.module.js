"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OrganizationTeamEmployeeModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationTeamEmployeeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const organization_team_employee_controller_1 = require("./organization-team-employee.controller");
const organization_team_employee_entity_1 = require("./organization-team-employee.entity");
const organization_team_employee_service_1 = require("./organization-team-employee.service");
const task_module_1 = require("./../tasks/task.module");
const repository_1 = require("./repository");
let OrganizationTeamEmployeeModule = exports.OrganizationTeamEmployeeModule = OrganizationTeamEmployeeModule_1 = class OrganizationTeamEmployeeModule {
};
exports.OrganizationTeamEmployeeModule = OrganizationTeamEmployeeModule = OrganizationTeamEmployeeModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/organization-team-employee',
                    module: OrganizationTeamEmployeeModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([organization_team_employee_entity_1.OrganizationTeamEmployee]),
            nestjs_1.MikroOrmModule.forFeature([organization_team_employee_entity_1.OrganizationTeamEmployee]),
            role_permission_module_1.RolePermissionModule,
            task_module_1.TaskModule
        ],
        controllers: [organization_team_employee_controller_1.OrganizationTeamEmployeeController],
        providers: [organization_team_employee_service_1.OrganizationTeamEmployeeService, repository_1.TypeOrmOrganizationTeamEmployeeRepository],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, organization_team_employee_service_1.OrganizationTeamEmployeeService, repository_1.TypeOrmOrganizationTeamEmployeeRepository]
    })
], OrganizationTeamEmployeeModule);
//# sourceMappingURL=organization-team-employee.module.js.map
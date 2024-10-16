"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var InviteModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const auth_module_1 = require("../auth/auth.module");
const handlers_1 = require("./commands/handlers");
const handlers_2 = require("./queries/handlers");
const tenant_module_1 = require("../tenant/tenant.module");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const role_module_1 = require("./../role/role.module");
const user_module_1 = require("./../user/user.module");
const employee_module_1 = require("./../employee/employee.module");
const candidate_module_1 = require("./../candidate/candidate.module");
const organization_module_1 = require("./../organization/organization.module");
const organization_team_module_1 = require("./../organization-team/organization-team.module");
const organization_team_employee_module_1 = require("./../organization-team-employee/organization-team-employee.module");
const organization_project_module_1 = require("./../organization-project/organization-project.module");
const organization_contact_module_1 = require("./../organization-contact/organization-contact.module");
const organization_department_module_1 = require("./../organization-department/organization-department.module");
const user_organization_module_1 = require("./../user-organization/user-organization.module");
const invite_controller_1 = require("./invite.controller");
const invite_entity_1 = require("./invite.entity");
const invite_service_1 = require("./invite.service");
const email_send_module_1 = require("./../email-send/email-send.module");
const repository_1 = require("./repository");
let InviteModule = exports.InviteModule = InviteModule_1 = class InviteModule {
};
exports.InviteModule = InviteModule = InviteModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                { path: '/invite', module: InviteModule_1 }
            ]),
            typeorm_1.TypeOrmModule.forFeature([invite_entity_1.Invite]),
            nestjs_1.MikroOrmModule.forFeature([invite_entity_1.Invite]),
            cqrs_1.CqrsModule,
            email_send_module_1.EmailSendModule,
            tenant_module_1.TenantModule,
            role_permission_module_1.RolePermissionModule,
            user_module_1.UserModule,
            role_module_1.RoleModule,
            employee_module_1.EmployeeModule,
            candidate_module_1.CandidateModule,
            organization_module_1.OrganizationModule,
            organization_project_module_1.OrganizationProjectModule,
            organization_contact_module_1.OrganizationContactModule,
            organization_department_module_1.OrganizationDepartmentModule,
            organization_team_module_1.OrganizationTeamModule,
            organization_team_employee_module_1.OrganizationTeamEmployeeModule,
            user_organization_module_1.UserOrganizationModule,
            auth_module_1.AuthModule,
        ],
        controllers: [invite_controller_1.InviteController],
        providers: [invite_service_1.InviteService, repository_1.TypeOrmInviteRepository, ...handlers_1.CommandHandlers, ...handlers_2.QueryHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, invite_service_1.InviteService, repository_1.TypeOrmInviteRepository]
    })
], InviteModule);
//# sourceMappingURL=invite.module.js.map
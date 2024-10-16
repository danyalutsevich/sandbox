"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OrganizationTeamJoinRequestModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationTeamJoinRequestModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const email_send_module_1 = require("./../email-send/email-send.module");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const invite_module_1 = require("../invite/invite.module");
const internal_1 = require("../core/entities/internal");
const role_module_1 = require("../role/role.module");
const user_module_1 = require("./../user/user.module");
const employee_module_1 = require("./../employee/employee.module");
const organization_team_module_1 = require("./../organization-team/organization-team.module");
const handlers_1 = require("./commands/handlers");
const organization_team_join_request_controller_1 = require("./organization-team-join-request.controller");
const organization_team_join_request_entity_1 = require("./organization-team-join-request.entity");
const organization_team_join_request_service_1 = require("./organization-team-join-request.service");
let OrganizationTeamJoinRequestModule = exports.OrganizationTeamJoinRequestModule = OrganizationTeamJoinRequestModule_1 = class OrganizationTeamJoinRequestModule {
};
exports.OrganizationTeamJoinRequestModule = OrganizationTeamJoinRequestModule = OrganizationTeamJoinRequestModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/organization-team-join',
                    module: OrganizationTeamJoinRequestModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([organization_team_join_request_entity_1.OrganizationTeamJoinRequest, internal_1.OrganizationTeamEmployee]),
            nestjs_1.MikroOrmModule.forFeature([organization_team_join_request_entity_1.OrganizationTeamJoinRequest, internal_1.OrganizationTeamEmployee]),
            cqrs_1.CqrsModule,
            role_permission_module_1.RolePermissionModule,
            user_module_1.UserModule,
            employee_module_1.EmployeeModule,
            organization_team_module_1.OrganizationTeamModule,
            email_send_module_1.EmailSendModule,
            invite_module_1.InviteModule,
            role_module_1.RoleModule
        ],
        controllers: [organization_team_join_request_controller_1.OrganizationTeamJoinRequestController],
        providers: [organization_team_join_request_service_1.OrganizationTeamJoinRequestService, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, organization_team_join_request_service_1.OrganizationTeamJoinRequestService]
    })
], OrganizationTeamJoinRequestModule);
//# sourceMappingURL=organization-team-join-request.module.js.map
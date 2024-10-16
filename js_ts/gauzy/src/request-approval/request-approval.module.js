"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RequestApprovalModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestApprovalModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const request_approval_entity_1 = require("./request-approval.entity");
const request_approval_controller_1 = require("./request-approval.controller");
const request_approval_service_1 = require("./request-approval.service");
const organization_team_module_1 = require("../organization-team/organization-team.module");
const employee_module_1 = require("../employee/employee.module");
const organization_team_employee_module_1 = require("../organization-team-employee/organization-team-employee.module");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const user_module_1 = require("./../user/user.module");
const role_module_1 = require("./../role/role.module");
const organization_module_1 = require("./../organization/organization.module");
const equipment_sharing_module_1 = require("./../equipment-sharing/equipment-sharing.module");
const time_off_request_module_1 = require("./../time-off-request/time-off-request.module");
const handlers_1 = require("./commands/handlers");
const task_module_1 = require("./../tasks/task.module");
const statistic_module_1 = require("../time-tracking/statistic/statistic.module");
const timer_module_1 = require("../time-tracking/timer/timer.module");
let RequestApprovalModule = exports.RequestApprovalModule = RequestApprovalModule_1 = class RequestApprovalModule {
};
exports.RequestApprovalModule = RequestApprovalModule = RequestApprovalModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/request-approval', module: RequestApprovalModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([request_approval_entity_1.RequestApproval]),
            nestjs_1.MikroOrmModule.forFeature([request_approval_entity_1.RequestApproval]),
            cqrs_1.CqrsModule,
            organization_team_employee_module_1.OrganizationTeamEmployeeModule,
            role_permission_module_1.RolePermissionModule,
            user_module_1.UserModule,
            employee_module_1.EmployeeModule,
            organization_team_module_1.OrganizationTeamModule,
            role_module_1.RoleModule,
            organization_module_1.OrganizationModule,
            equipment_sharing_module_1.EquipmentSharingModule,
            time_off_request_module_1.TimeOffRequestModule,
            task_module_1.TaskModule,
            timer_module_1.TimerModule,
            statistic_module_1.StatisticModule
        ],
        controllers: [request_approval_controller_1.RequestApprovalController],
        providers: [request_approval_service_1.RequestApprovalService, ...handlers_1.CommandHandlers],
        exports: [request_approval_service_1.RequestApprovalService]
    })
], RequestApprovalModule);
//# sourceMappingURL=request-approval.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TimeOffRequestModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeOffRequestModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const time_off_request_service_1 = require("./time-off-request.service");
const time_off_request_entity_1 = require("./time-off-request.entity");
const employee_entity_1 = require("../employee/employee.entity");
const time_off_request_controller_1 = require("./time-off-request.controller");
const time_off_policy_entity_1 = require("../time-off-policy/time-off-policy.entity");
const request_approval_entity_1 = require("../request-approval/request-approval.entity");
const approval_policy_entity_1 = require("../approval-policy/approval-policy.entity");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const handlers_1 = require("./commands/handlers");
let TimeOffRequestModule = exports.TimeOffRequestModule = TimeOffRequestModule_1 = class TimeOffRequestModule {
};
exports.TimeOffRequestModule = TimeOffRequestModule = TimeOffRequestModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: 'time-off-request', module: TimeOffRequestModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([time_off_request_entity_1.TimeOffRequest, employee_entity_1.Employee, time_off_policy_entity_1.TimeOffPolicy, request_approval_entity_1.RequestApproval, approval_policy_entity_1.ApprovalPolicy]),
            nestjs_1.MikroOrmModule.forFeature([time_off_request_entity_1.TimeOffRequest, employee_entity_1.Employee, time_off_policy_entity_1.TimeOffPolicy, request_approval_entity_1.RequestApproval, approval_policy_entity_1.ApprovalPolicy]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [time_off_request_controller_1.TimeOffRequestController],
        providers: [time_off_request_service_1.TimeOffRequestService, ...handlers_1.CommandHandlers],
        exports: [time_off_request_service_1.TimeOffRequestService, typeorm_1.TypeOrmModule]
    })
], TimeOffRequestModule);
//# sourceMappingURL=time-off-request.module.js.map
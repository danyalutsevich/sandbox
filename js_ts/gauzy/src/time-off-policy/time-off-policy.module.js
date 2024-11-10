"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TimeOffPolicyModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeOffPolicyModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const time_off_policy_service_1 = require("./time-off-policy.service");
const time_off_policy_entity_1 = require("./time-off-policy.entity");
const time_off_policy_controller_1 = require("./time-off-policy.controller");
const employee_module_1 = require("./../employee/employee.module");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const task_module_1 = require("../tasks/task.module");
let TimeOffPolicyModule = exports.TimeOffPolicyModule = TimeOffPolicyModule_1 = class TimeOffPolicyModule {
};
exports.TimeOffPolicyModule = TimeOffPolicyModule = TimeOffPolicyModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                { path: 'time-off-policy', module: TimeOffPolicyModule_1 }
            ]),
            typeorm_1.TypeOrmModule.forFeature([time_off_policy_entity_1.TimeOffPolicy]),
            nestjs_1.MikroOrmModule.forFeature([time_off_policy_entity_1.TimeOffPolicy]),
            role_permission_module_1.RolePermissionModule,
            employee_module_1.EmployeeModule,
            task_module_1.TaskModule
        ],
        controllers: [time_off_policy_controller_1.TimeOffPolicyController],
        providers: [time_off_policy_service_1.TimeOffPolicyService],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, time_off_policy_service_1.TimeOffPolicyService]
    })
], TimeOffPolicyModule);
//# sourceMappingURL=time-off-policy.module.js.map
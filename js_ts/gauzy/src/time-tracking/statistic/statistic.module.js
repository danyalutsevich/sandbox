"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticModule = void 0;
const common_1 = require("@nestjs/common");
const employee_module_1 = require("./../../employee/employee.module");
const organization_project_module_1 = require("./../../organization-project/organization-project.module");
const statistic_controller_1 = require("./statistic.controller");
const statistic_service_1 = require("./statistic.service");
const task_module_1 = require("./../../tasks/task.module");
const time_slot_module_1 = require("./../time-slot/time-slot.module");
const activity_module_1 = require("./../activity/activity.module");
const time_log_module_1 = require("./../time-log/time-log.module");
const role_permission_module_1 = require("../../role-permission/role-permission.module");
let StatisticModule = exports.StatisticModule = class StatisticModule {
};
exports.StatisticModule = StatisticModule = __decorate([
    (0, common_1.Module)({
        controllers: [statistic_controller_1.StatisticController],
        imports: [
            role_permission_module_1.RolePermissionModule,
            organization_project_module_1.OrganizationProjectModule,
            task_module_1.TaskModule,
            time_slot_module_1.TimeSlotModule,
            employee_module_1.EmployeeModule,
            activity_module_1.ActivityModule,
            time_log_module_1.TimeLogModule,
        ],
        providers: [statistic_service_1.StatisticService],
        exports: [statistic_service_1.StatisticService]
    })
], StatisticModule);
//# sourceMappingURL=statistic.module.js.map
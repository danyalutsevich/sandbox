"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const time_log_module_1 = require("./../time-log/time-log.module");
const employee_module_1 = require("./../../employee/employee.module");
const role_permission_module_1 = require("../../role-permission/role-permission.module");
const timer_controller_1 = require("./timer.controller");
const timer_service_1 = require("./timer.service");
let TimerModule = exports.TimerModule = class TimerModule {
};
exports.TimerModule = TimerModule = __decorate([
    (0, common_1.Module)({
        controllers: [timer_controller_1.TimerController],
        imports: [
            role_permission_module_1.RolePermissionModule,
            time_log_module_1.TimeLogModule,
            employee_module_1.EmployeeModule,
            cqrs_1.CqrsModule
        ],
        providers: [timer_service_1.TimerService],
        exports: [timer_service_1.TimerService]
    })
], TimerModule);
//# sourceMappingURL=timer.module.js.map
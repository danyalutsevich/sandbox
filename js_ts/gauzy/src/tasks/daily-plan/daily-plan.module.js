"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DailyPlanModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyPlanModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const typeorm_1 = require("@nestjs/typeorm");
const daily_plan_service_1 = require("./daily-plan.service");
const daily_plan_controller_1 = require("./daily-plan.controller");
const role_permission_1 = require("role-permission");
const daily_plan_entity_1 = require("./daily-plan.entity");
const employee_module_1 = require("../../employee/employee.module");
const task_module_1 = require("../task.module");
const repository_1 = require("./repository");
let DailyPlanModule = exports.DailyPlanModule = DailyPlanModule_1 = class DailyPlanModule {
};
exports.DailyPlanModule = DailyPlanModule = DailyPlanModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                { path: '/daily-plan', module: DailyPlanModule_1 }
            ]),
            typeorm_1.TypeOrmModule.forFeature([daily_plan_entity_1.DailyPlan]),
            nestjs_1.MikroOrmModule.forFeature([daily_plan_entity_1.DailyPlan]),
            role_permission_1.RolePermissionModule,
            employee_module_1.EmployeeModule,
            task_module_1.TaskModule
        ],
        controllers: [daily_plan_controller_1.DailyPlanController],
        providers: [daily_plan_service_1.DailyPlanService, repository_1.TypeOrmDailyPlanRepository],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, daily_plan_service_1.DailyPlanService]
    })
], DailyPlanModule);
//# sourceMappingURL=daily-plan.module.js.map
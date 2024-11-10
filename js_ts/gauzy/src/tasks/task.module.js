"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TaskModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const internal_1 = require("core/entities/internal");
const organization_project_module_1 = require("./../organization-project/organization-project.module");
const handlers_1 = require("./commands/handlers");
const handlers_2 = require("./events/handlers");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const user_module_1 = require("./../user/user.module");
const role_module_1 = require("./../role/role.module");
const employee_module_1 = require("./../employee/employee.module");
const task_entity_1 = require("./task.entity");
const task_service_1 = require("./task.service");
const task_controller_1 = require("./task.controller");
const repository_1 = require("./repository");
const forFeatureEntities = [task_entity_1.Task, internal_1.TaskStatus, internal_1.IntegrationMap];
let TaskModule = exports.TaskModule = TaskModule_1 = class TaskModule {
};
exports.TaskModule = TaskModule = TaskModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/tasks', module: TaskModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature(forFeatureEntities),
            nestjs_1.MikroOrmModule.forFeature(forFeatureEntities),
            role_permission_module_1.RolePermissionModule,
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            role_module_1.RoleModule,
            employee_module_1.EmployeeModule,
            organization_project_module_1.OrganizationProjectModule,
            cqrs_1.CqrsModule,
        ],
        controllers: [task_controller_1.TaskController],
        providers: [task_service_1.TaskService, repository_1.TypeOrmTaskRepository, ...handlers_1.CommandHandlers, ...handlers_2.EventHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, task_service_1.TaskService, repository_1.TypeOrmTaskRepository]
    })
], TaskModule);
//# sourceMappingURL=task.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TaskEstimationModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskEstimationModule = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../../role-permission/role-permission.module");
const task_estimation_entity_1 = require("./task-estimation.entity");
const task_estimation_controller_1 = require("./task-estimation.controller");
const task_estimation_service_1 = require("./task-estimation.service");
const task_module_1 = require("../task.module");
const handlers_1 = require("./commands/handlers");
let TaskEstimationModule = exports.TaskEstimationModule = TaskEstimationModule_1 = class TaskEstimationModule {
};
exports.TaskEstimationModule = TaskEstimationModule = TaskEstimationModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/task-estimation', module: TaskEstimationModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([task_estimation_entity_1.TaskEstimation]),
            nestjs_1.MikroOrmModule.forFeature([task_estimation_entity_1.TaskEstimation]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule,
            task_module_1.TaskModule
        ],
        controllers: [task_estimation_controller_1.TaskEstimationController],
        providers: [task_estimation_service_1.TaskEstimationService, ...handlers_1.CommandHandlers],
        exports: [task_estimation_service_1.TaskEstimationService]
    })
], TaskEstimationModule);
//# sourceMappingURL=task-estimation.module.js.map
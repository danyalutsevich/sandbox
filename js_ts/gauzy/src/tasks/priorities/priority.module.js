"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TaskPriorityModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskPriorityModule = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../../role-permission/role-permission.module");
const priority_controller_1 = require("./priority.controller");
const priority_entity_1 = require("./priority.entity");
const priority_service_1 = require("./priority.service");
const handlers_1 = require("./commands/handlers");
let TaskPriorityModule = exports.TaskPriorityModule = TaskPriorityModule_1 = class TaskPriorityModule {
};
exports.TaskPriorityModule = TaskPriorityModule = TaskPriorityModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/task-priorities', module: TaskPriorityModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([priority_entity_1.TaskPriority]),
            nestjs_1.MikroOrmModule.forFeature([priority_entity_1.TaskPriority]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [priority_controller_1.TaskPriorityController],
        providers: [priority_service_1.TaskPriorityService, ...handlers_1.CommandHandlers],
        exports: [priority_service_1.TaskPriorityService]
    })
], TaskPriorityModule);
//# sourceMappingURL=priority.module.js.map
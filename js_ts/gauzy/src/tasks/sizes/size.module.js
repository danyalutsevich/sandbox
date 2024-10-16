"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TaskSizeModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSizeModule = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../../role-permission/role-permission.module");
const size_entity_1 = require("./size.entity");
const size_service_1 = require("./size.service");
const size_controller_1 = require("./size.controller");
const handlers_1 = require("./commands/handlers");
let TaskSizeModule = exports.TaskSizeModule = TaskSizeModule_1 = class TaskSizeModule {
};
exports.TaskSizeModule = TaskSizeModule = TaskSizeModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/task-sizes', module: TaskSizeModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([size_entity_1.TaskSize]),
            nestjs_1.MikroOrmModule.forFeature([size_entity_1.TaskSize]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [size_controller_1.TaskSizeController],
        providers: [size_service_1.TaskSizeService, ...handlers_1.CommandHandlers],
        exports: [size_service_1.TaskSizeService]
    })
], TaskSizeModule);
//# sourceMappingURL=size.module.js.map
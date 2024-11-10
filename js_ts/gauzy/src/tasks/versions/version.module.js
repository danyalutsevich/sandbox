"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TaskVersionModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskVersionModule = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../../role-permission/role-permission.module");
const version_entity_1 = require("./version.entity");
const version_controller_1 = require("./version.controller");
const version_service_1 = require("./version.service");
const handlers_1 = require("./commands/handlers");
const handlers_2 = require("./queries/handlers");
let TaskVersionModule = exports.TaskVersionModule = TaskVersionModule_1 = class TaskVersionModule {
};
exports.TaskVersionModule = TaskVersionModule = TaskVersionModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/task-versions', module: TaskVersionModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([version_entity_1.TaskVersion]),
            nestjs_1.MikroOrmModule.forFeature([version_entity_1.TaskVersion]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [version_controller_1.TaskVersionController],
        providers: [version_service_1.TaskVersionService, ...handlers_2.QueryHandlers, ...handlers_1.CommandHandlers],
        exports: [version_service_1.TaskVersionService]
    })
], TaskVersionModule);
//# sourceMappingURL=version.module.js.map
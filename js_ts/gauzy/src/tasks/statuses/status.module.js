"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatusModule = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../../role-permission/role-permission.module");
const status_entity_1 = require("./status.entity");
const status_controller_1 = require("./status.controller");
const status_service_1 = require("./status.service");
const handlers_1 = require("./commands/handlers");
const handlers_2 = require("./queries/handlers");
let TaskStatusModule = exports.TaskStatusModule = class TaskStatusModule {
};
exports.TaskStatusModule = TaskStatusModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([status_entity_1.TaskStatus]),
            nestjs_1.MikroOrmModule.forFeature([status_entity_1.TaskStatus]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [status_controller_1.TaskStatusController],
        providers: [status_service_1.TaskStatusService, ...handlers_2.QueryHandlers, ...handlers_1.CommandHandlers],
        exports: [status_service_1.TaskStatusService]
    })
], TaskStatusModule);
//# sourceMappingURL=status.module.js.map
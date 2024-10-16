"use strict";
// Modified code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UserModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const handlers_1 = require("./commands/handlers");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const factory_reset_module_1 = require("./factory-reset/factory-reset.module");
const task_module_1 = require("./../tasks/task.module");
const employee_module_1 = require("./../employee/employee.module");
const type_orm_user_repository_1 = require("./repository/type-orm-user.repository");
let UserModule = exports.UserModule = UserModule_1 = class UserModule {
};
exports.UserModule = UserModule = UserModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/user', module: UserModule_1 }]),
            (0, common_1.forwardRef)(() => typeorm_1.TypeOrmModule.forFeature([user_entity_1.User])),
            (0, common_1.forwardRef)(() => nestjs_1.MikroOrmModule.forFeature([user_entity_1.User])),
            (0, common_1.forwardRef)(() => role_permission_module_1.RolePermissionModule),
            (0, common_1.forwardRef)(() => task_module_1.TaskModule),
            (0, common_1.forwardRef)(() => employee_module_1.EmployeeModule),
            cqrs_1.CqrsModule,
            factory_reset_module_1.FactoryResetModule
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, type_orm_user_repository_1.TypeOrmUserRepository, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, user_service_1.UserService, type_orm_user_repository_1.TypeOrmUserRepository]
    })
], UserModule);
//# sourceMappingURL=user.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RoleModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_entity_1 = require("./role.entity");
const role_service_1 = require("./role.service");
const role_controller_1 = require("./role.controller");
const role_permission_module_1 = require("./../role-permission/role-permission.module");
const handlers_1 = require("./commands/handlers");
const type_orm_role_repository_1 = require("./repository/type-orm-role.repository");
let RoleModule = exports.RoleModule = RoleModule_1 = class RoleModule {
};
exports.RoleModule = RoleModule = RoleModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                { path: '/roles', module: RoleModule_1 }
            ]),
            (0, common_1.forwardRef)(() => typeorm_1.TypeOrmModule.forFeature([role_entity_1.Role])),
            (0, common_1.forwardRef)(() => nestjs_1.MikroOrmModule.forFeature([role_entity_1.Role])),
            (0, common_1.forwardRef)(() => role_permission_module_1.RolePermissionModule),
            cqrs_1.CqrsModule
        ],
        controllers: [role_controller_1.RoleController],
        providers: [...handlers_1.CommandHandlers, role_service_1.RoleService, type_orm_role_repository_1.TypeOrmRoleRepository],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, role_service_1.RoleService, type_orm_role_repository_1.TypeOrmRoleRepository]
    })
], RoleModule);
//# sourceMappingURL=role.module.js.map
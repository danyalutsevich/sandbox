"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RolePermissionModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const cache_manager_1 = require("@nestjs/cache-manager");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_controller_1 = require("./role-permission.controller");
const role_permission_entity_1 = require("./role-permission.entity");
const role_permission_service_1 = require("./role-permission.service");
const role_module_1 = require("./../role/role.module");
const repository_1 = require("./repository");
let RolePermissionModule = exports.RolePermissionModule = RolePermissionModule_1 = class RolePermissionModule {
};
exports.RolePermissionModule = RolePermissionModule = RolePermissionModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                { path: 'role-permissions', module: RolePermissionModule_1 }
            ]),
            (0, common_1.forwardRef)(() => typeorm_1.TypeOrmModule.forFeature([role_permission_entity_1.RolePermission])),
            (0, common_1.forwardRef)(() => nestjs_1.MikroOrmModule.forFeature([role_permission_entity_1.RolePermission])),
            (0, common_1.forwardRef)(() => role_module_1.RoleModule),
            cqrs_1.CqrsModule,
            cache_manager_1.CacheModule.register({ isGlobal: true })
        ],
        controllers: [role_permission_controller_1.RolePermissionController],
        providers: [role_permission_service_1.RolePermissionService, repository_1.TypeOrmRolePermissionRepository],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, cache_manager_1.CacheModule, role_permission_service_1.RolePermissionService, repository_1.TypeOrmRolePermissionRepository]
    })
], RolePermissionModule);
//# sourceMappingURL=role-permission.module.js.map
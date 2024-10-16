"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TenantModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const auth_module_1 = require("../auth/auth.module");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const role_module_1 = require("../role/role.module");
const user_module_1 = require("../user/user.module");
const feature_module_1 = require("./../feature/feature.module");
const tenant_controller_1 = require("./tenant.controller");
const tenant_entity_1 = require("./tenant.entity");
const tenant_service_1 = require("./tenant.service");
const handlers_1 = require("./commands/handlers");
const repository_1 = require("./repository");
let TenantModule = exports.TenantModule = TenantModule_1 = class TenantModule {
};
exports.TenantModule = TenantModule = TenantModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                { path: '/tenant', module: TenantModule_1 }
            ]),
            typeorm_1.TypeOrmModule.forFeature([tenant_entity_1.Tenant]),
            nestjs_1.MikroOrmModule.forFeature([tenant_entity_1.Tenant]),
            auth_module_1.AuthModule,
            cqrs_1.CqrsModule,
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => role_module_1.RoleModule),
            (0, common_1.forwardRef)(() => role_permission_module_1.RolePermissionModule),
            (0, common_1.forwardRef)(() => feature_module_1.FeatureModule)
        ],
        controllers: [tenant_controller_1.TenantController],
        providers: [tenant_service_1.TenantService, repository_1.TypeOrmTenantRepository, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, tenant_service_1.TenantService, repository_1.TypeOrmTenantRepository]
    })
], TenantModule);
//# sourceMappingURL=tenant.module.js.map
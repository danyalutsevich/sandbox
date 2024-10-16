"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var IntegrationTenantModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationTenantModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const integration_tenant_controller_1 = require("./integration-tenant.controller");
const integration_tenant_service_1 = require("./integration-tenant.service");
const integration_tenant_entity_1 = require("./integration-tenant.entity");
const integration_setting_module_1 = require("./../integration-setting/integration-setting.module");
const integration_entity_setting_module_1 = require("./../integration-entity-setting/integration-entity-setting.module");
const role_module_1 = require("../role/role.module");
const handlers_1 = require("./commands/handlers");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const repository_1 = require("./repository");
let IntegrationTenantModule = exports.IntegrationTenantModule = IntegrationTenantModule_1 = class IntegrationTenantModule {
};
exports.IntegrationTenantModule = IntegrationTenantModule = IntegrationTenantModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                { path: '/integration-tenant', module: IntegrationTenantModule_1 }
            ]),
            typeorm_1.TypeOrmModule.forFeature([integration_tenant_entity_1.IntegrationTenant]),
            nestjs_1.MikroOrmModule.forFeature([integration_tenant_entity_1.IntegrationTenant]),
            role_module_1.RoleModule,
            role_permission_module_1.RolePermissionModule,
            (0, common_1.forwardRef)(() => integration_setting_module_1.IntegrationSettingModule),
            (0, common_1.forwardRef)(() => integration_entity_setting_module_1.IntegrationEntitySettingModule),
            cqrs_1.CqrsModule
        ],
        controllers: [integration_tenant_controller_1.IntegrationTenantController],
        providers: [integration_tenant_service_1.IntegrationTenantService, repository_1.TypeOrmIntegrationTenantRepository, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, integration_tenant_service_1.IntegrationTenantService, repository_1.TypeOrmIntegrationTenantRepository],
    })
], IntegrationTenantModule);
//# sourceMappingURL=integration-tenant.module.js.map
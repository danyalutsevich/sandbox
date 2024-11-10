"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var IntegrationEntitySettingModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationEntitySettingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const integration_tenant_module_1 = require("./../integration-tenant/integration-tenant.module");
const handlers_1 = require("./commands/handlers");
const integration_entity_setting_entity_1 = require("./integration-entity-setting.entity");
const integration_entity_setting_controller_1 = require("./integration-entity-setting.controller");
const integration_entity_setting_service_1 = require("./integration-entity-setting.service");
let IntegrationEntitySettingModule = exports.IntegrationEntitySettingModule = IntegrationEntitySettingModule_1 = class IntegrationEntitySettingModule {
};
exports.IntegrationEntitySettingModule = IntegrationEntitySettingModule = IntegrationEntitySettingModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/integration-entity-setting',
                    module: IntegrationEntitySettingModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([integration_entity_setting_entity_1.IntegrationEntitySetting]),
            nestjs_1.MikroOrmModule.forFeature([integration_entity_setting_entity_1.IntegrationEntitySetting]),
            (0, common_1.forwardRef)(() => integration_tenant_module_1.IntegrationTenantModule),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [integration_entity_setting_controller_1.IntegrationEntitySettingController],
        providers: [integration_entity_setting_service_1.IntegrationEntitySettingService, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, integration_entity_setting_service_1.IntegrationEntitySettingService]
    })
], IntegrationEntitySettingModule);
//# sourceMappingURL=integration-entity-setting.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TenantSettingModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantSettingModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../../role-permission/role-permission.module");
const tenant_setting_controller_1 = require("./tenant-setting.controller");
const tenant_setting_entity_1 = require("./tenant-setting.entity");
const tenant_setting_service_1 = require("./tenant-setting.service");
const handlers_1 = require("./commands/handlers");
let TenantSettingModule = exports.TenantSettingModule = TenantSettingModule_1 = class TenantSettingModule {
};
exports.TenantSettingModule = TenantSettingModule = TenantSettingModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/tenant-setting', module: TenantSettingModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([tenant_setting_entity_1.TenantSetting]),
            nestjs_1.MikroOrmModule.forFeature([tenant_setting_entity_1.TenantSetting]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [tenant_setting_controller_1.TenantSettingController],
        providers: [tenant_setting_service_1.TenantSettingService, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, tenant_setting_service_1.TenantSettingService]
    })
], TenantSettingModule);
//# sourceMappingURL=tenant-setting.module.js.map
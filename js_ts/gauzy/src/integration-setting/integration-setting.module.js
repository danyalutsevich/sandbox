"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationSettingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const handlers_1 = require("./commands/handlers");
const integration_setting_controller_1 = require("./integration-setting.controller");
const integration_setting_service_1 = require("./integration-setting.service");
const integration_setting_entity_1 = require("./integration-setting.entity");
let IntegrationSettingModule = exports.IntegrationSettingModule = class IntegrationSettingModule {
};
exports.IntegrationSettingModule = IntegrationSettingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([integration_setting_entity_1.IntegrationSetting]),
            nestjs_1.MikroOrmModule.forFeature([integration_setting_entity_1.IntegrationSetting]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [
            integration_setting_controller_1.IntegrationSettingController
        ],
        providers: [
            integration_setting_service_1.IntegrationSettingService,
            ...handlers_1.CommandHandlers
        ],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, integration_setting_service_1.IntegrationSettingService]
    })
], IntegrationSettingModule);
//# sourceMappingURL=integration-setting.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var IntegrationEntitySettingTiedModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationEntitySettingTiedModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const integration_entity_setting_tied_entity_1 = require("./integration-entity-setting-tied.entity");
const integration_entity_setting_tied_controller_1 = require("./integration-entity-setting-tied.controller");
const integration_entity_setting_tied_service_1 = require("./integration-entity-setting-tied.service");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let IntegrationEntitySettingTiedModule = exports.IntegrationEntitySettingTiedModule = IntegrationEntitySettingTiedModule_1 = class IntegrationEntitySettingTiedModule {
};
exports.IntegrationEntitySettingTiedModule = IntegrationEntitySettingTiedModule = IntegrationEntitySettingTiedModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/integration-entity-setting-tied',
                    module: IntegrationEntitySettingTiedModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([integration_entity_setting_tied_entity_1.IntegrationEntitySettingTied]),
            nestjs_1.MikroOrmModule.forFeature([integration_entity_setting_tied_entity_1.IntegrationEntitySettingTied]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [integration_entity_setting_tied_controller_1.IntegrationEntitySettingTiedController],
        providers: [integration_entity_setting_tied_service_1.IntegrationEntitySettingTiedService],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, integration_entity_setting_tied_service_1.IntegrationEntitySettingTiedService]
    })
], IntegrationEntitySettingTiedModule);
//# sourceMappingURL=integration-entity-setting-tied.module.js.map
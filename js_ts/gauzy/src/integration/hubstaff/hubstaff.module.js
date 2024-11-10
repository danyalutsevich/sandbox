"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HubstaffModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../../plugins/plugins/integration-hubstaff/dist/index");
const user_module_1 = require("user/user.module");
const role_module_1 = require("role/role.module");
const role_permission_module_1 = require("../../role-permission/role-permission.module");
const organization_module_1 = require("organization/organization.module");
const integration_entity_setting_module_1 = require("integration-entity-setting/integration-entity-setting.module");
const integration_entity_setting_tied_module_1 = require("integration-entity-setting-tied/integration-entity-setting-tied.module");
const integration_module_1 = require("integration/integration.module");
const integration_map_module_1 = require("integration-map/integration-map.module");
const integration_tenant_module_1 = require("integration-tenant/integration-tenant.module");
const integration_setting_module_1 = require("integration-setting/integration-setting.module");
const organization_project_module_1 = require("organization-project/organization-project.module");
const screenshot_module_1 = require("time-tracking/screenshot/screenshot.module");
const hubstaff_service_1 = require("./hubstaff.service");
const hubstaff_controller_1 = require("./hubstaff.controller");
const hubstaff_authorization_controller_1 = require("./hubstaff-authorization.controller");
let HubstaffModule = exports.HubstaffModule = class HubstaffModule {
};
exports.HubstaffModule = HubstaffModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule.register({ baseURL: index_1.HUBSTAFF_API_URL }),
            user_module_1.UserModule,
            role_module_1.RoleModule,
            organization_module_1.OrganizationModule,
            role_permission_module_1.RolePermissionModule,
            organization_project_module_1.OrganizationProjectModule,
            (0, common_1.forwardRef)(() => integration_module_1.IntegrationModule),
            integration_tenant_module_1.IntegrationTenantModule,
            integration_setting_module_1.IntegrationSettingModule,
            integration_entity_setting_module_1.IntegrationEntitySettingModule,
            integration_entity_setting_tied_module_1.IntegrationEntitySettingTiedModule,
            integration_map_module_1.IntegrationMapModule,
            screenshot_module_1.ScreenshotModule,
            cqrs_1.CqrsModule
        ],
        controllers: [
            hubstaff_authorization_controller_1.HubstaffAuthorizationController,
            hubstaff_controller_1.HubstaffController
        ],
        providers: [
            hubstaff_service_1.HubstaffService
        ]
    })
], HubstaffModule);
//# sourceMappingURL=hubstaff.module.js.map
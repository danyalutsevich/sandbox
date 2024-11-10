"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FeatureModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const feature_entity_1 = require("./feature.entity");
const feature_organization_entity_1 = require("./feature-organization.entity");
const feature_toggle_controller_1 = require("./feature-toggle.controller");
const feature_service_1 = require("./feature.service");
const feature_organization_service_1 = require("./feature-organization.service");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const handlers_1 = require("./commands/handlers");
const repository_1 = require("./repository");
let FeatureModule = exports.FeatureModule = FeatureModule_1 = class FeatureModule {
};
exports.FeatureModule = FeatureModule = FeatureModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/feature/toggle', module: FeatureModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([feature_entity_1.Feature, feature_organization_entity_1.FeatureOrganization]),
            nestjs_1.MikroOrmModule.forFeature([feature_entity_1.Feature, feature_organization_entity_1.FeatureOrganization]),
            (0, common_1.forwardRef)(() => role_permission_module_1.RolePermissionModule),
            cqrs_1.CqrsModule
        ],
        controllers: [feature_toggle_controller_1.FeatureToggleController],
        providers: [feature_service_1.FeatureService, feature_organization_service_1.FeatureOrganizationService, repository_1.TypeOrmFeatureRepository, repository_1.TypeOrmFeatureOrganizationRepository, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, feature_service_1.FeatureService, feature_organization_service_1.FeatureOrganizationService]
    })
], FeatureModule);
//# sourceMappingURL=feature.module.js.map
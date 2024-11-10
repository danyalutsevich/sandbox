"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OrganizationLanguageModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationLanguageModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const organization_language_entity_1 = require("./organization-language.entity");
const organization_language_controller_1 = require("./organization-language.controller");
const organization_language_service_1 = require("./organization-language.service");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let OrganizationLanguageModule = exports.OrganizationLanguageModule = OrganizationLanguageModule_1 = class OrganizationLanguageModule {
};
exports.OrganizationLanguageModule = OrganizationLanguageModule = OrganizationLanguageModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/organization-languages',
                    module: OrganizationLanguageModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([organization_language_entity_1.OrganizationLanguage]),
            nestjs_1.MikroOrmModule.forFeature([organization_language_entity_1.OrganizationLanguage]),
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [organization_language_controller_1.OrganizationLanguageController],
        providers: [organization_language_service_1.OrganizationLanguageService],
        exports: [organization_language_service_1.OrganizationLanguageService]
    })
], OrganizationLanguageModule);
//# sourceMappingURL=organization-language.module.js.map
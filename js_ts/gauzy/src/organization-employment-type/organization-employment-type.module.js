"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OrganizationEmploymentTypeModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationEmploymentTypeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const organization_employment_type_controller_1 = require("./organization-employment-type.controller");
const organization_employment_type_entity_1 = require("./organization-employment-type.entity");
const organization_employment_type_service_1 = require("./organization-employment-type.service");
let OrganizationEmploymentTypeModule = exports.OrganizationEmploymentTypeModule = OrganizationEmploymentTypeModule_1 = class OrganizationEmploymentTypeModule {
};
exports.OrganizationEmploymentTypeModule = OrganizationEmploymentTypeModule = OrganizationEmploymentTypeModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/organization-employment-type',
                    module: OrganizationEmploymentTypeModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([organization_employment_type_entity_1.OrganizationEmploymentType]),
            nestjs_1.MikroOrmModule.forFeature([organization_employment_type_entity_1.OrganizationEmploymentType]),
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [organization_employment_type_controller_1.OrganizationEmploymentTypeController],
        providers: [organization_employment_type_service_1.OrganizationEmploymentTypeService],
        exports: [organization_employment_type_service_1.OrganizationEmploymentTypeService]
    })
], OrganizationEmploymentTypeModule);
//# sourceMappingURL=organization-employment-type.module.js.map
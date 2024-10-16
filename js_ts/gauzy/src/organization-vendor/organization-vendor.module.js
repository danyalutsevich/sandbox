"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OrganizationVendorModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationVendorModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const organization_vendor_entity_1 = require("./organization-vendor.entity");
const organization_vendor_controller_1 = require("./organization-vendor.controller");
const organization_vendor_service_1 = require("./organization-vendor.service");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const handlers_1 = require("./commands/handlers");
let OrganizationVendorModule = exports.OrganizationVendorModule = OrganizationVendorModule_1 = class OrganizationVendorModule {
};
exports.OrganizationVendorModule = OrganizationVendorModule = OrganizationVendorModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/organization-vendors', module: OrganizationVendorModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([organization_vendor_entity_1.OrganizationVendor]),
            nestjs_1.MikroOrmModule.forFeature([organization_vendor_entity_1.OrganizationVendor]),
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [organization_vendor_controller_1.OrganizationVendorController],
        providers: [organization_vendor_service_1.OrganizationVendorService, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, organization_vendor_service_1.OrganizationVendorService]
    })
], OrganizationVendorModule);
//# sourceMappingURL=organization-vendor.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProductVariantSettingModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantSettingModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const product_setting_entity_1 = require("./product-setting.entity");
const product_setting_service_1 = require("./product-setting.service");
const product_setting_controller_1 = require("./product-setting.controller");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let ProductVariantSettingModule = exports.ProductVariantSettingModule = ProductVariantSettingModule_1 = class ProductVariantSettingModule {
};
exports.ProductVariantSettingModule = ProductVariantSettingModule = ProductVariantSettingModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/product-variant-settings',
                    module: ProductVariantSettingModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([product_setting_entity_1.ProductVariantSetting]),
            nestjs_1.MikroOrmModule.forFeature([product_setting_entity_1.ProductVariantSetting]),
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [product_setting_controller_1.ProductVariantSettingController],
        providers: [product_setting_service_1.ProductVariantSettingService],
        exports: [product_setting_service_1.ProductVariantSettingService]
    })
], ProductVariantSettingModule);
//# sourceMappingURL=product-setting.module.js.map
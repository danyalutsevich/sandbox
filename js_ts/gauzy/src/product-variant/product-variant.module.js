"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProductVariantModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const product_variant_entity_1 = require("./product-variant.entity");
const product_variant_controller_1 = require("./product-variant.controller");
const product_variant_service_1 = require("./product-variant.service");
const product_variant_price_module_1 = require("./../product-variant-price/product-variant-price-module");
const product_setting_module_1 = require("./../product-setting/product-setting.module");
const product_module_1 = require("./../product/product.module");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const handlers_1 = require("./commands/handlers");
let ProductVariantModule = exports.ProductVariantModule = ProductVariantModule_1 = class ProductVariantModule {
};
exports.ProductVariantModule = ProductVariantModule = ProductVariantModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/product-variants', module: ProductVariantModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([product_variant_entity_1.ProductVariant]),
            nestjs_1.MikroOrmModule.forFeature([product_variant_entity_1.ProductVariant]),
            role_permission_module_1.RolePermissionModule,
            product_variant_price_module_1.ProductVariantPriceModule,
            product_setting_module_1.ProductVariantSettingModule,
            (0, common_1.forwardRef)(() => product_module_1.ProductModule),
            cqrs_1.CqrsModule
        ],
        controllers: [product_variant_controller_1.ProductVariantController],
        providers: [product_variant_service_1.ProductVariantService, ...handlers_1.CommandHandlers],
        exports: [product_variant_service_1.ProductVariantService]
    })
], ProductVariantModule);
//# sourceMappingURL=product-variant.module.js.map
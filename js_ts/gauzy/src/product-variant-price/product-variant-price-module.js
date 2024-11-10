"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProductVariantPriceModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantPriceModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const product_variant_price_entity_1 = require("./product-variant-price.entity");
const product_variant_price_controller_1 = require("./product-variant-price.controller");
const product_variant_price_service_1 = require("./product-variant-price.service");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let ProductVariantPriceModule = exports.ProductVariantPriceModule = ProductVariantPriceModule_1 = class ProductVariantPriceModule {
};
exports.ProductVariantPriceModule = ProductVariantPriceModule = ProductVariantPriceModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/product-variant-prices',
                    module: ProductVariantPriceModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([product_variant_price_entity_1.ProductVariantPrice]),
            nestjs_1.MikroOrmModule.forFeature([product_variant_price_entity_1.ProductVariantPrice]),
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [product_variant_price_controller_1.ProductVariantPriceController],
        providers: [product_variant_price_service_1.ProductVariantPriceService],
        exports: [product_variant_price_service_1.ProductVariantPriceService]
    })
], ProductVariantPriceModule);
//# sourceMappingURL=product-variant-price-module.js.map
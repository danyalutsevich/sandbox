"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProductModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const product_entity_1 = require("./product.entity");
const product_controller_1 = require("./product.controller");
const product_service_1 = require("./product.service");
const product_variant_module_1 = require("./../product-variant/product-variant.module");
const product_variant_price_module_1 = require("./../product-variant-price/product-variant-price-module");
const product_setting_module_1 = require("./../product-setting/product-setting.module");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const product_translation_entity_1 = require("./product-translation.entity");
const product_option_module_1 = require("./../product-option/product-option-module");
const handlers_1 = require("./commands/handlers");
let ProductModule = exports.ProductModule = ProductModule_1 = class ProductModule {
};
exports.ProductModule = ProductModule = ProductModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/products', module: ProductModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product, product_translation_entity_1.ProductTranslation]),
            nestjs_1.MikroOrmModule.forFeature([product_entity_1.Product, product_translation_entity_1.ProductTranslation]),
            cqrs_1.CqrsModule,
            role_permission_module_1.RolePermissionModule,
            product_setting_module_1.ProductVariantSettingModule,
            product_variant_price_module_1.ProductVariantPriceModule,
            product_option_module_1.ProductOptionModule,
            (0, common_1.forwardRef)(() => product_variant_module_1.ProductVariantModule)
        ],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService, ...handlers_1.CommandHandlers],
        exports: [product_service_1.ProductService]
    })
], ProductModule);
//# sourceMappingURL=product.module.js.map
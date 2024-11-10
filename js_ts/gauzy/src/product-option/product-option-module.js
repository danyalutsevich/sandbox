"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProductOptionModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductOptionModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const product_option_entity_1 = require("./product-option.entity");
const product_option_service_1 = require("./product-option.service");
const product_option_controller_1 = require("./product-option.controller");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const product_option_group_service_1 = require("./product-option-group.service");
const product_option_translation_entity_1 = require("./product-option-translation.entity");
const product_option_group_entity_1 = require("./product-option-group.entity");
const product_option_group_translation_entity_1 = require("./product-option-group-translation.entity");
const forFeatureEntities = [
    product_option_entity_1.ProductOption,
    product_option_translation_entity_1.ProductOptionTranslation,
    product_option_group_entity_1.ProductOptionGroup,
    product_option_group_translation_entity_1.ProductOptionGroupTranslation
];
let ProductOptionModule = exports.ProductOptionModule = ProductOptionModule_1 = class ProductOptionModule {
};
exports.ProductOptionModule = ProductOptionModule = ProductOptionModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/product-options', module: ProductOptionModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature(forFeatureEntities),
            nestjs_1.MikroOrmModule.forFeature(forFeatureEntities),
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [product_option_controller_1.ProductOptionController],
        providers: [product_option_service_1.ProductOptionService, product_option_group_service_1.ProductOptionGroupService],
        exports: [product_option_service_1.ProductOptionService, product_option_group_service_1.ProductOptionGroupService]
    })
], ProductOptionModule);
//# sourceMappingURL=product-option-module.js.map
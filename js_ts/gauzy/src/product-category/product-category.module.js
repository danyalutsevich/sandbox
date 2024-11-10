"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProductCategoryModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const product_category_entity_1 = require("./product-category.entity");
const product_category_service_1 = require("./product-category.service");
const product_category_controller_1 = require("./product-category.controller");
const product_category_translation_entity_1 = require("./product-category-translation.entity");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const handlers_1 = require("./commands/handlers");
let ProductCategoryModule = exports.ProductCategoryModule = ProductCategoryModule_1 = class ProductCategoryModule {
};
exports.ProductCategoryModule = ProductCategoryModule = ProductCategoryModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/product-categories', module: ProductCategoryModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([product_category_entity_1.ProductCategory, product_category_translation_entity_1.ProductCategoryTranslation]),
            nestjs_1.MikroOrmModule.forFeature([product_category_entity_1.ProductCategory, product_category_translation_entity_1.ProductCategoryTranslation]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [product_category_controller_1.ProductCategoryController],
        providers: [product_category_service_1.ProductCategoryService, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, product_category_service_1.ProductCategoryService]
    })
], ProductCategoryModule);
//# sourceMappingURL=product-category.module.js.map
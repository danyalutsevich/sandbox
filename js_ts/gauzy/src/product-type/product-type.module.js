"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProductTypeModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTypeModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const product_type_entity_1 = require("./product-type.entity");
const product_type_controller_1 = require("./product-type.controller");
const product_type_service_1 = require("./product-type.service");
const product_type_translation_entity_1 = require("./product-type-translation.entity");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const handlers_1 = require("./commands/handlers");
let ProductTypeModule = exports.ProductTypeModule = ProductTypeModule_1 = class ProductTypeModule {
};
exports.ProductTypeModule = ProductTypeModule = ProductTypeModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/product-types', module: ProductTypeModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([product_type_entity_1.ProductType, product_type_translation_entity_1.ProductTypeTranslation]),
            nestjs_1.MikroOrmModule.forFeature([product_type_entity_1.ProductType, product_type_translation_entity_1.ProductTypeTranslation]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [product_type_controller_1.ProductTypeController],
        providers: [product_type_service_1.ProductTypeService, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, product_type_service_1.ProductTypeService]
    })
], ProductTypeModule);
//# sourceMappingURL=product-type.module.js.map
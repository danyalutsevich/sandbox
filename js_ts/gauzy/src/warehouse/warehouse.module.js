"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WarehouseModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const warehouse_service_1 = require("./warehouse.service");
const warehouse_controller_1 = require("./warehouse.controller");
const warehouse_entity_1 = require("./warehouse.entity");
const internal_1 = require("./../core/entities/internal");
const warehouse_product_variant_entity_1 = require("./warehouse-product-variant.entity");
const warehouse_product_entity_1 = require("./warehouse-product.entity");
const warehouse_product_service_1 = require("./warehouse-product-service");
const type_orm_warehouse_repository_1 = require("./repository/type-orm-warehouse.repository");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const forFeatureEntities = [
    warehouse_entity_1.Warehouse,
    internal_1.Product,
    warehouse_product_entity_1.WarehouseProduct,
    warehouse_product_variant_entity_1.WarehouseProductVariant
];
let WarehouseModule = exports.WarehouseModule = WarehouseModule_1 = class WarehouseModule {
};
exports.WarehouseModule = WarehouseModule = WarehouseModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                { path: '/warehouses', module: WarehouseModule_1 }
            ]),
            typeorm_1.TypeOrmModule.forFeature(forFeatureEntities),
            nestjs_1.MikroOrmModule.forFeature(forFeatureEntities),
            role_permission_module_1.RolePermissionModule,
        ],
        controllers: [warehouse_controller_1.WarehouseController],
        providers: [warehouse_service_1.WarehouseService, warehouse_product_service_1.WarehouseProductService, type_orm_warehouse_repository_1.TypeOrmWarehouseRepository],
        exports: [warehouse_service_1.WarehouseService, warehouse_product_service_1.WarehouseProductService, type_orm_warehouse_repository_1.TypeOrmWarehouseRepository]
    })
], WarehouseModule);
//# sourceMappingURL=warehouse.module.js.map
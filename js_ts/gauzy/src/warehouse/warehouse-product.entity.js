"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseProduct = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const internal_1 = require("../core/entities/internal");
const pipes_1 = require("./../shared/pipes");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_warehouse_product_repository_1 = require("./repository/mikro-orm-warehouse-product.repository ");
let WarehouseProduct = exports.WarehouseProduct = class WarehouseProduct extends internal_1.TenantOrganizationBaseEntity {
    quantity;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Warehouse
     */
    warehouse;
    warehouseId;
    /**
     * Product
     */
    product;
    productId;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    variants;
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Number }),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        type: 'numeric',
        default: 0,
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], WarehouseProduct.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Warehouse }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Warehouse, (warehouse) => warehouse.products, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], WarehouseProduct.prototype, "warehouse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.warehouse),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], WarehouseProduct.prototype, "warehouseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Product }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Product, (product) => product.warehouses, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], WarehouseProduct.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.product),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], WarehouseProduct.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.WarehouseProductVariant, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.WarehouseProductVariant, (warehouseProductVariant) => warehouseProductVariant.warehouseProduct, {
        cascade: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], WarehouseProduct.prototype, "variants", void 0);
exports.WarehouseProduct = WarehouseProduct = __decorate([
    (0, entity_1.MultiORMEntity)('warehouse_product', { mikroOrmRepository: () => mikro_orm_warehouse_product_repository_1.MikroOrmWarehouseProductRepository })
], WarehouseProduct);
//# sourceMappingURL=warehouse-product.entity.js.map
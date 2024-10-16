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
exports.WarehouseProductVariant = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const warehouse_product_entity_1 = require("./warehouse-product.entity");
const pipes_1 = require("./../shared/pipes");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_warehouse_product_variant_repository_1 = require("./repository/mikro-orm-warehouse-product-variant.repository");
let WarehouseProductVariant = exports.WarehouseProductVariant = class WarehouseProductVariant extends internal_1.TenantOrganizationBaseEntity {
    quantity;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * ProductVariant
     */
    variant;
    variantId;
    /**
     * WarehouseProduct
     */
    warehouseProduct;
    warehouseProductId;
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
], WarehouseProductVariant.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.ProductVariant }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.ProductVariant, (productVariant) => productVariant.warehouseProductVariants, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], WarehouseProductVariant.prototype, "variant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.variant),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], WarehouseProductVariant.prototype, "variantId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => warehouse_product_entity_1.WarehouseProduct, (warehouseProduct) => warehouseProduct.variants, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], WarehouseProductVariant.prototype, "warehouseProduct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.warehouseProduct),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], WarehouseProductVariant.prototype, "warehouseProductId", void 0);
exports.WarehouseProductVariant = WarehouseProductVariant = __decorate([
    (0, entity_1.MultiORMEntity)('warehouse_product_variant', { mikroOrmRepository: () => mikro_orm_warehouse_product_variant_repository_1.MikroOrmWarehouseProductVariantRepository })
], WarehouseProductVariant);
//# sourceMappingURL=warehouse-product-variant.entity.js.map
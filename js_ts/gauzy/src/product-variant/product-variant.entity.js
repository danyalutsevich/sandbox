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
exports.ProductVariant = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_product_variant_repository_1 = require("./repository/mikro-orm-product-variant.repository");
let ProductVariant = exports.ProductVariant = class ProductVariant extends internal_1.TenantOrganizationBaseEntity {
    taxes;
    notes;
    quantity;
    billingInvoicingPolicy;
    internalReference;
    enabled;
    /*
    |--------------------------------------------------------------------------
    | @OneToOne
    |--------------------------------------------------------------------------
    */
    /**
     * ProductVariantPrice
     */
    price;
    /**
     * ProductVariantSetting
     */
    setting;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Product
     */
    product;
    productId;
    /**
     * ImageAsset
     */
    image;
    imageId;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    /**
     * ProductOption
     */
    warehouseProductVariants;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    /**
     * ProductOption
     */
    options;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ default: 0 }),
    __metadata("design:type", Number)
], ProductVariant.prototype, "taxes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], ProductVariant.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ default: 0 }),
    __metadata("design:type", Number)
], ProductVariant.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsEnum)(index_1.BillingInvoicingPolicyEnum),
    (0, entity_1.MultiORMColumn)({ default: index_1.BillingInvoicingPolicyEnum.QUANTITY_ORDERED }),
    __metadata("design:type", String)
], ProductVariant.prototype, "billingInvoicingPolicy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], ProductVariant.prototype, "internalReference", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], ProductVariant.prototype, "enabled", void 0);
__decorate([
    (0, entity_1.MultiORMOneToOne)(() => internal_1.ProductVariantPrice, (productVariantPrice) => productVariantPrice.productVariant, {
        /** Eager relations are always loaded automatically when relation's owner entity is loaded using find* methods. */
        eager: true,
        /** Database cascade action on delete. */
        onDelete: 'CASCADE',
        /** This column is a boolean flag indicating that this is the inverse side of the relationship, and it doesn't control the foreign key directly  */
        owner: false
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], ProductVariant.prototype, "price", void 0);
__decorate([
    (0, entity_1.MultiORMOneToOne)(() => internal_1.ProductVariantSetting, (productVariantSetting) => productVariantSetting.productVariant, {
        /** Eager relations are always loaded automatically when relation's owner entity is loaded using find* methods. */
        eager: true,
        /** Database cascade action on delete. */
        onDelete: 'CASCADE',
        /** This column is a boolean flag indicating that this is the inverse side of the relationship, and it doesn't control the foreign key directly  */
        owner: false
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], ProductVariant.prototype, "setting", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Product }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Product, (product) => product.variants, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], ProductVariant.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.product),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], ProductVariant.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.ImageAsset }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.ImageAsset, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** Eager relations are always loaded automatically when relation's owner entity is loaded using find* methods. */
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", internal_1.ImageAsset)
], ProductVariant.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.image),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], ProductVariant.prototype, "imageId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.WarehouseProductVariant, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.WarehouseProductVariant, (warehouseProductVariant) => warehouseProductVariant.variant, {
        cascade: true
    }),
    __metadata("design:type", Array)
], ProductVariant.prototype, "warehouseProductVariants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.ProductOption }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.ProductOption, { eager: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], ProductVariant.prototype, "options", void 0);
exports.ProductVariant = ProductVariant = __decorate([
    (0, entity_1.MultiORMEntity)('product_variant', { mikroOrmRepository: () => mikro_orm_product_variant_repository_1.MikroOrmProductVariantRepository })
], ProductVariant);
//# sourceMappingURL=product-variant.entity.js.map
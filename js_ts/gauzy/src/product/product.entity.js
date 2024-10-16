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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_product_repository_1 = require("./repository/mikro-orm-product.repository");
let Product = exports.Product = class Product extends internal_1.TranslatableBase {
    enabled;
    code;
    imageUrl;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * ImageAsset
     */
    featuredImage;
    featuredImageId;
    /**
     * ProductType
     */
    productType;
    productTypeId;
    /**
     * ProductCategory
     */
    productCategory;
    productCategoryId;
    /**
     * ProductVariant
     */
    variants;
    /**
     * ProductOptionGroup
     */
    optionGroups;
    /**
     * InvoiceItem
     */
    invoiceItems;
    /**
     * WarehouseProduct
     */
    warehouses;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    /**
     * Tag
     */
    tags;
    /**
     * ImageAsset
     */
    gallery;
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "enabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Product.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.ImageAsset }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.ImageAsset, (imageAsset) => imageAsset.productFeaturedImage, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** Database cascade action on delete. */
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Product.prototype, "featuredImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.featuredImage),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Product.prototype, "featuredImageId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.ProductType }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.ProductType, (productType) => productType.products, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", internal_1.ProductType)
], Product.prototype, "productType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.productType),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Product.prototype, "productTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.ProductCategory }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.ProductCategory, (productCategory) => productCategory.products, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", internal_1.ProductCategory)
], Product.prototype, "productCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.productCategory),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Product.prototype, "productCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.ProductTranslation, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.ProductTranslation, (productTranslation) => productTranslation.reference, {
        /** Eager relations are always loaded automatically when relation's owner entity is loaded using find* methods. */
        eager: true,
        /** Database cascade actions. */
        cascade: true
    }),
    __metadata("design:type", Array)
], Product.prototype, "translations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.ProductVariant, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.ProductVariant, (productVariant) => productVariant.product, {
        cascade: true
    }),
    __metadata("design:type", Array)
], Product.prototype, "variants", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.ProductOptionGroup, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.ProductOptionGroup, (productOptionGroup) => productOptionGroup.product, {
        cascade: true
    }),
    __metadata("design:type", Array)
], Product.prototype, "optionGroups", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.InvoiceItem, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.InvoiceItem, (invoiceItem) => invoiceItem.product),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Product.prototype, "invoiceItems", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.WarehouseProduct, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.WarehouseProduct, (warehouseProduct) => warehouseProduct.product, {
        cascade: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Product.prototype, "warehouses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Tag, isArray: true }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Tag, (tag) => tag.products, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'tag_product',
        joinColumn: 'productId',
        inverseJoinColumn: 'tagId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'tag_product'
    }),
    __metadata("design:type", Array)
], Product.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.ImageAsset, isArray: true }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.ImageAsset, (imageAsset) => imageAsset.productGallery, {
        cascade: false,
        owner: true,
        pivotTable: 'product_gallery_item',
        joinColumn: 'productId',
        inverseJoinColumn: 'imageAssetId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'product_gallery_item'
    }),
    __metadata("design:type", Array)
], Product.prototype, "gallery", void 0);
exports.Product = Product = __decorate([
    (0, entity_1.MultiORMEntity)('product', { mikroOrmRepository: () => mikro_orm_product_repository_1.MikroOrmProductRepository })
], Product);
//# sourceMappingURL=product.entity.js.map
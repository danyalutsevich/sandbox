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
exports.ImageAsset = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const pipes_1 = require("./../shared/pipes");
const internal_1 = require("./../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_image_asset_repository_1 = require("./repository/mikro-orm-image-asset.repository");
let ImageAsset = exports.ImageAsset = class ImageAsset extends internal_1.TenantOrganizationBaseEntity {
    name;
    url;
    thumb;
    width;
    height;
    size;
    isFeatured;
    externalProviderId;
    storageProvider;
    /** Additional virtual columns */
    fullUrl;
    thumbUrl;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    /**
     * Product
     */
    productFeaturedImage;
    /**
     * Equipment
     */
    equipmentImage;
    /**
     * Warehouse
     */
    warehouses;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    /**
     * Product
     */
    productGallery;
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], ImageAsset.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], ImageAsset.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], ImageAsset.prototype, "thumb", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ default: 0 }),
    __metadata("design:type", Number)
], ImageAsset.prototype, "width", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ default: 0 }),
    __metadata("design:type", Number)
], ImageAsset.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        type: 'numeric',
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], ImageAsset.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean }),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], ImageAsset.prototype, "isFeatured", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], ImageAsset.prototype, "externalProviderId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, enum: index_1.FileStorageProviderEnum }),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    (0, entity_1.MultiORMColumn)({ type: 'simple-enum', nullable: true, enum: index_1.FileStorageProviderEnum }),
    __metadata("design:type", String)
], ImageAsset.prototype, "storageProvider", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", String)
], ImageAsset.prototype, "fullUrl", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", String)
], ImageAsset.prototype, "thumbUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Product, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Product, (product) => product.featuredImage, {
        onDelete: 'SET NULL'
    }),
    __metadata("design:type", Array)
], ImageAsset.prototype, "productFeaturedImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Equipment, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Equipment, (equipment) => equipment.image, {
        onDelete: 'SET NULL'
    }),
    __metadata("design:type", Array)
], ImageAsset.prototype, "equipmentImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Warehouse, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Warehouse, (warehouse) => warehouse.logo, {
        onDelete: 'SET NULL'
    }),
    __metadata("design:type", Array)
], ImageAsset.prototype, "warehouses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Product, isArray: true }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Product, (product) => product.gallery),
    __metadata("design:type", Array)
], ImageAsset.prototype, "productGallery", void 0);
exports.ImageAsset = ImageAsset = __decorate([
    (0, entity_1.MultiORMEntity)('image_asset', { mikroOrmRepository: () => mikro_orm_image_asset_repository_1.MikroOrmImageAssetRepository })
], ImageAsset);
//# sourceMappingURL=image-asset.entity.js.map
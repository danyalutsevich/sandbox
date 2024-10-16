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
exports.ProductOptionGroup = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_product_option_group_repository_1 = require("./repository/mikro-orm-product-option-group.repository");
let ProductOptionGroup = exports.ProductOptionGroup = class ProductOptionGroup extends internal_1.TenantOrganizationBaseEntity {
    name;
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
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    /**
     * ProductOption
     */
    options;
    /**
     * ProductOptionGroupTranslation
     */
    translations;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], ProductOptionGroup.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Product }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Product, (product) => product.optionGroups),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", internal_1.Product)
], ProductOptionGroup.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.product),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], ProductOptionGroup.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.ProductOption, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.ProductOption, (productOption) => productOption.group, {
        /** Eager relations are always loaded automatically when relation's owner entity is loaded using find* methods. */
        eager: true,
    }),
    __metadata("design:type", Array)
], ProductOptionGroup.prototype, "options", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.ProductOptionGroupTranslation, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.ProductOptionGroupTranslation, (translation) => translation.reference, {
        /** Eager relations are always loaded automatically when relation's owner entity is loaded using find* methods. */
        eager: true,
    }),
    __metadata("design:type", Array)
], ProductOptionGroup.prototype, "translations", void 0);
exports.ProductOptionGroup = ProductOptionGroup = __decorate([
    (0, entity_1.MultiORMEntity)('product_option_group', { mikroOrmRepository: () => mikro_orm_product_option_group_repository_1.MikroOrmProductOptionGroupRepository })
], ProductOptionGroup);
//# sourceMappingURL=product-option-group.entity.js.map
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
exports.ProductType = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const swagger_1 = require("@nestjs/swagger");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_product_type_repository_1 = require("./repository/mikro-orm-product-type.repository");
let ProductType = exports.ProductType = class ProductType extends internal_1.TranslatableBase {
    icon;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    /**
     * Product
     */
    products;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.ProductTypesIconsEnum }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], ProductType.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Product, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Product, (product) => product.productType),
    __metadata("design:type", Array)
], ProductType.prototype, "products", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.ProductTypeTranslation, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.ProductTypeTranslation, (productTypeTranslation) => productTypeTranslation.reference, {
        /** Eager relations are always loaded automatically when relation's owner entity is loaded using find* methods. */
        eager: true,
        /** Database cascade actions. */
        cascade: true
    }),
    __metadata("design:type", Array)
], ProductType.prototype, "translations", void 0);
exports.ProductType = ProductType = __decorate([
    (0, entity_1.MultiORMEntity)('product_type', { mikroOrmRepository: () => mikro_orm_product_type_repository_1.MikroOrmProductTypeRepository })
], ProductType);
//# sourceMappingURL=product-type.entity.js.map
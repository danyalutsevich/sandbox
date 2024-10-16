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
exports.ProductVariantPrice = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/contracts/dist/index");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_product_variant_price_repository_1 = require("./repository/mikro-orm-product-variant-price.repository");
let ProductVariantPrice = exports.ProductVariantPrice = class ProductVariantPrice extends internal_1.TenantOrganizationBaseEntity {
    unitCost;
    unitCostCurrency;
    retailPrice;
    retailPriceCurrency;
    /*
    |--------------------------------------------------------------------------
    | @OneToOne
    |--------------------------------------------------------------------------
    */
    /**
     * ProductVariant
     */
    productVariant;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ default: 0 }),
    __metadata("design:type", Number)
], ProductVariantPrice.prototype, "unitCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.CurrenciesEnum }),
    (0, class_validator_1.IsEnum)(index_1.CurrenciesEnum),
    (0, entity_1.MultiORMColumn)({ default: index_1.CurrenciesEnum.USD }),
    __metadata("design:type", String)
], ProductVariantPrice.prototype, "unitCostCurrency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ default: 0 }),
    __metadata("design:type", Number)
], ProductVariantPrice.prototype, "retailPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.CurrenciesEnum }),
    (0, class_validator_1.IsEnum)(index_1.CurrenciesEnum),
    (0, entity_1.MultiORMColumn)({ default: index_1.CurrenciesEnum.USD }),
    __metadata("design:type", String)
], ProductVariantPrice.prototype, "retailPriceCurrency", void 0);
__decorate([
    (0, entity_1.MultiORMOneToOne)(() => internal_1.ProductVariant, (productVariant) => productVariant.price, {
        /** Database cascade action on delete. */
        onDelete: 'CASCADE',
        /** This column is a boolean flag indicating whether the current entity is the 'owning' side of a relationship.  */
        owner: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", internal_1.ProductVariant)
], ProductVariantPrice.prototype, "productVariant", void 0);
exports.ProductVariantPrice = ProductVariantPrice = __decorate([
    (0, entity_1.MultiORMEntity)('product_variant_price', { mikroOrmRepository: () => mikro_orm_product_variant_price_repository_1.MikroOrmProductVariantPriceRepository })
], ProductVariantPrice);
//# sourceMappingURL=product-variant-price.entity.js.map
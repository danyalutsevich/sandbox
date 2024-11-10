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
exports.ProductVariantSetting = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_product_setting_repository_1 = require("./repository/mikro-orm-product-setting.repository");
let ProductVariantSetting = exports.ProductVariantSetting = class ProductVariantSetting extends internal_1.TenantOrganizationBaseEntity {
    isSubscription;
    isPurchaseAutomatically;
    canBeSold;
    canBePurchased;
    canBeCharged;
    canBeRented;
    isEquipment;
    trackInventory;
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
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], ProductVariantSetting.prototype, "isSubscription", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], ProductVariantSetting.prototype, "isPurchaseAutomatically", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], ProductVariantSetting.prototype, "canBeSold", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], ProductVariantSetting.prototype, "canBePurchased", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], ProductVariantSetting.prototype, "canBeCharged", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], ProductVariantSetting.prototype, "canBeRented", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], ProductVariantSetting.prototype, "isEquipment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], ProductVariantSetting.prototype, "trackInventory", void 0);
__decorate([
    (0, entity_1.MultiORMOneToOne)(() => internal_1.ProductVariant, (productVariant) => productVariant.setting, {
        /** Database cascade action on delete. */
        onDelete: 'CASCADE',
        /** This column is a boolean flag indicating whether the current entity is the 'owning' side of a relationship.  */
        owner: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", internal_1.ProductVariant)
], ProductVariantSetting.prototype, "productVariant", void 0);
exports.ProductVariantSetting = ProductVariantSetting = __decorate([
    (0, entity_1.MultiORMEntity)('product_variant_setting', { mikroOrmRepository: () => mikro_orm_product_setting_repository_1.MikroOrmProductVariantSettingRepository })
], ProductVariantSetting);
//# sourceMappingURL=product-setting.entity.js.map
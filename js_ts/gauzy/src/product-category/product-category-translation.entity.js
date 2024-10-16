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
exports.ProductCategoryTranslation = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_product_category_translation_repository_1 = require("./repository/mikro-orm-product-category-translation.repository");
let ProductCategoryTranslation = exports.ProductCategoryTranslation = class ProductCategoryTranslation extends internal_1.TranslationBase {
    name;
    description;
    referenceId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], ProductCategoryTranslation.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], ProductCategoryTranslation.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: false }),
    __metadata("design:type", String)
], ProductCategoryTranslation.prototype, "languageCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.ProductCategory }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.ProductCategory, (productCategory) => productCategory.translations, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", internal_1.ProductCategory)
], ProductCategoryTranslation.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.reference),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], ProductCategoryTranslation.prototype, "referenceId", void 0);
exports.ProductCategoryTranslation = ProductCategoryTranslation = __decorate([
    (0, entity_1.MultiORMEntity)('product_category_translation', { mikroOrmRepository: () => mikro_orm_product_category_translation_repository_1.MikroOrmProductCategoryTranslationRepository })
], ProductCategoryTranslation);
//# sourceMappingURL=product-category-translation.entity.js.map
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
exports.ProductTypeTranslation = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_product_type_translation_repository_1 = require("./repository/mikro-orm-product-type-translation.repository");
let ProductTypeTranslation = exports.ProductTypeTranslation = class ProductTypeTranslation extends internal_1.TranslationBase {
    name;
    description;
    referenceId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], ProductTypeTranslation.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], ProductTypeTranslation.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: false }),
    __metadata("design:type", String)
], ProductTypeTranslation.prototype, "languageCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.ProductType }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.ProductType, (productType) => productType.translations, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", internal_1.ProductType)
], ProductTypeTranslation.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.reference),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], ProductTypeTranslation.prototype, "referenceId", void 0);
exports.ProductTypeTranslation = ProductTypeTranslation = __decorate([
    (0, entity_1.MultiORMEntity)('product_type_translation', { mikroOrmRepository: () => mikro_orm_product_type_translation_repository_1.MikroOrmProductTypeTranslationRepository })
], ProductTypeTranslation);
//# sourceMappingURL=product-type-translation.entity.js.map
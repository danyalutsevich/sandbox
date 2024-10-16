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
exports.ProductTranslation = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const internal_1 = require("../core/entities/internal");
const product_entity_1 = require("./product.entity");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_product_translation_repository_1 = require("./repository/mikro-orm-product-translation.repository");
let ProductTranslation = exports.ProductTranslation = class ProductTranslation extends internal_1.TranslationBase {
    name;
    description;
    referenceId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], ProductTranslation.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], ProductTranslation.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.LanguagesEnum }),
    (0, class_validator_1.IsEnum)(index_1.LanguagesEnum),
    (0, entity_1.MultiORMColumn)({ nullable: false }),
    __metadata("design:type", String)
], ProductTranslation.prototype, "languageCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => product_entity_1.Product }),
    (0, entity_1.MultiORMManyToOne)(() => product_entity_1.Product, (product) => product.translations, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], ProductTranslation.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.reference),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], ProductTranslation.prototype, "referenceId", void 0);
exports.ProductTranslation = ProductTranslation = __decorate([
    (0, entity_1.MultiORMEntity)('product_translation', { mikroOrmRepository: () => mikro_orm_product_translation_repository_1.MikroOrmProductTranslationRepository })
], ProductTranslation);
//# sourceMappingURL=product-translation.entity.js.map
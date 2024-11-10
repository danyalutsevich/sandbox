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
exports.ProductOptionGroupTranslation = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/contracts/dist/index");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const internal_1 = require("../core/entities/internal");
const product_option_group_entity_1 = require("./product-option-group.entity");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_product_option_group_translation_repository_1 = require("./repository/mikro-orm-product-option-group-translation.repository");
let ProductOptionGroupTranslation = exports.ProductOptionGroupTranslation = class ProductOptionGroupTranslation extends internal_1.TenantOrganizationBaseEntity {
    name;
    languageCode;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * ProductOptionGroup
     */
    reference;
    referenceId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], ProductOptionGroupTranslation.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.LanguagesEnum }),
    (0, class_validator_1.IsEnum)(index_1.LanguagesEnum),
    (0, entity_1.MultiORMColumn)({ nullable: false }),
    __metadata("design:type", String)
], ProductOptionGroupTranslation.prototype, "languageCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => product_option_group_entity_1.ProductOptionGroup }),
    (0, entity_1.MultiORMManyToOne)(() => product_option_group_entity_1.ProductOptionGroup, (group) => group.translations),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", product_option_group_entity_1.ProductOptionGroup)
], ProductOptionGroupTranslation.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.reference),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], ProductOptionGroupTranslation.prototype, "referenceId", void 0);
exports.ProductOptionGroupTranslation = ProductOptionGroupTranslation = __decorate([
    (0, entity_1.MultiORMEntity)('product_option_group_translation', { mikroOrmRepository: () => mikro_orm_product_option_group_translation_repository_1.MikroOrmProductOptionGroupTranslationRepository })
], ProductOptionGroupTranslation);
//# sourceMappingURL=product-option-group-translation.entity.js.map
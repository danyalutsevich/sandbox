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
exports.ProductOption = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const product_option_group_entity_1 = require("./product-option-group.entity");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_product_option_repository_1 = require("./repository/mikro-orm-product-option.repository");
let ProductOption = exports.ProductOption = class ProductOption extends internal_1.TenantOrganizationBaseEntity {
    name;
    code;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * ProductOptionGroup
     */
    group;
    groupId;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    translations;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], ProductOption.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], ProductOption.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => product_option_group_entity_1.ProductOptionGroup }),
    (0, entity_1.MultiORMManyToOne)(() => product_option_group_entity_1.ProductOptionGroup, (group) => group.options),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", product_option_group_entity_1.ProductOptionGroup)
], ProductOption.prototype, "group", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.group),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], ProductOption.prototype, "groupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.ProductOptionTranslation, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.ProductOptionTranslation, (translation) => translation.reference, {
        /** Eager relations are always loaded automatically when relation's owner entity is loaded using find* methods. */
        eager: true,
    }),
    __metadata("design:type", Array)
], ProductOption.prototype, "translations", void 0);
exports.ProductOption = ProductOption = __decorate([
    (0, entity_1.MultiORMEntity)('product_option', { mikroOrmRepository: () => mikro_orm_product_option_repository_1.MikroOrmProductOptionRepository })
], ProductOption);
//# sourceMappingURL=product-option.entity.js.map
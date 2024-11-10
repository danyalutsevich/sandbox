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
exports.Merchant = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_merchant_repository_1 = require("./repository/mikro-orm-merchant.repository");
let Merchant = exports.Merchant = class Merchant extends internal_1.TenantOrganizationBaseEntity {
    name;
    code;
    email;
    phone;
    description;
    active;
    currency;
    /*
    |--------------------------------------------------------------------------
    | @OneToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Contact
     */
    contact;
    contactId;
    /*
    |--------------------------------------------------------------------------
    | @OneToOne
    |--------------------------------------------------------------------------
    */
    /**
     * ImageAsset
     */
    logo;
    logoId;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    /**
     * Tag
     */
    tags;
    /**
     * Warehouses
     */
    warehouses;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Merchant.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Merchant.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Merchant.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Merchant.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Merchant.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], Merchant.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ default: index_1.CurrenciesEnum.USD }),
    __metadata("design:type", String)
], Merchant.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Contact }),
    (0, entity_1.MultiORMOneToOne)(() => internal_1.Contact, {
        /** If set to true then it means that related object can be allowed to be inserted or updated in the database. */
        cascade: true,
        /** Database cascade action on delete. */
        onDelete: 'CASCADE',
        /** This column is a boolean flag indicating whether the current entity is the 'owning' side of a relationship.  */
        owner: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Merchant.prototype, "contact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.contact),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], Merchant.prototype, "contactId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.ImageAsset }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.ImageAsset, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        cascade: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Merchant.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.logo),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], Merchant.prototype, "logoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Tag, isArray: true }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Tag, (tag) => tag.merchants, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'tag_merchant',
        joinColumn: 'merchantId',
        inverseJoinColumn: 'tagId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'tag_merchant'
    }),
    __metadata("design:type", Array)
], Merchant.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Warehouse, isArray: true }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Warehouse, (it) => it.merchants, {
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'warehouse_merchant',
        joinColumn: 'merchantId',
        inverseJoinColumn: 'warehouseId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'warehouse_merchant'
    }),
    __metadata("design:type", Array)
], Merchant.prototype, "warehouses", void 0);
exports.Merchant = Merchant = __decorate([
    (0, entity_1.MultiORMEntity)('merchant', { mikroOrmRepository: () => mikro_orm_merchant_repository_1.MikroOrmMerchantRepository })
], Merchant);
//# sourceMappingURL=merchant.entity.js.map
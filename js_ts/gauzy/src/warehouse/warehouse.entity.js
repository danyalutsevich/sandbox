"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warehouse = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const dist = __importStar(require("../../plugins/contracts/dist/index"));
const internal_1 = require("../core/entities/internal");
const warehouse_product_entity_1 = require("./warehouse-product.entity");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_warehouse_repository_1 = require("./repository/mikro-orm-warehouse.repository");
let Warehouse = exports.Warehouse = class Warehouse extends internal_1.TenantOrganizationBaseEntity {
    name;
    code;
    email;
    description;
    active;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * ImageAsset
     */
    logo;
    logoId;
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
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    /**
     * WarehouseProduct
     */
    products;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    /**
     * Warehouse Tags
     */
    tags;
    /**
     * Merchants
     */
    merchants;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Warehouse.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Warehouse.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Warehouse.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Warehouse.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], Warehouse.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.ImageAsset }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.ImageAsset, (imageAsset) => imageAsset.warehouses, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** Database cascade action on delete. */
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Warehouse.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.logo),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Warehouse.prototype, "logoId", void 0);
__decorate([
    (0, entity_1.MultiORMOneToOne)(() => internal_1.Contact, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** If set to true then it means that related object can be allowed to be inserted or updated in the database. */
        cascade: true,
        /** Database cascade action on delete. */
        onDelete: 'CASCADE',
        /** This column is a boolean flag indicating whether the current entity is the 'owning' side of a relationship.  */
        owner: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Warehouse.prototype, "contact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.contact),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], Warehouse.prototype, "contactId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => warehouse_product_entity_1.WarehouseProduct, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => warehouse_product_entity_1.WarehouseProduct, (warehouseProduct) => warehouseProduct.warehouse, {
        cascade: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Warehouse.prototype, "products", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Tag, (it) => it.warehouses, {
        /** Defines the database cascade action on update. */
        onUpdate: 'CASCADE',
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE',
        /** Indicates that this entity (Warehouse) is the owner side of the relationship. */
        owner: true,
        /** Specifies the name of the pivot table in the database. */
        pivotTable: 'tag_warehouse',
        joinColumn: 'warehouseId',
        inverseJoinColumn: 'tagId',
    }),
    (0, typeorm_1.JoinTable)({
        /** Specifies the name of the pivot table in the database. */
        name: 'tag_warehouse'
    }),
    __metadata("design:type", Array)
], Warehouse.prototype, "tags", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Merchant, (it) => it.warehouses, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Warehouse.prototype, "merchants", void 0);
exports.Warehouse = Warehouse = __decorate([
    (0, entity_1.MultiORMEntity)('warehouse', { mikroOrmRepository: () => mikro_orm_warehouse_repository_1.MikroOrmWarehouseRepository })
], Warehouse);
//# sourceMappingURL=warehouse.entity.js.map
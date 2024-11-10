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
exports.Tenant = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_tenant_repository_1 = require("./repository/mikro-orm-tenant.repository");
let Tenant = exports.Tenant = class Tenant extends internal_1.BaseEntity {
    name;
    logo;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * ImageAsset
     */
    image;
    imageId;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    organizations;
    rolePermissions;
    /**
     * Array of feature organizations associated with the entity.
     */
    featureOrganizations;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Tenant.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Tenant.prototype, "logo", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.ImageAsset, {
        /** Indicates if the relation column value can be nullable or not. */
        nullable: true,
        /** Database cascade action on delete. */
        onDelete: 'SET NULL',
        /** Eager relations are always loaded automatically when relation's owner entity is loaded using find* methods. */
        eager: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", internal_1.ImageAsset)
], Tenant.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.image),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], Tenant.prototype, "imageId", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Organization, (it) => it.tenant, {
        cascade: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Tenant.prototype, "organizations", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.RolePermission, (it) => it.tenant, {
        cascade: true
    }),
    __metadata("design:type", Array)
], Tenant.prototype, "rolePermissions", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.FeatureOrganization, (it) => it.tenant, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Tenant.prototype, "featureOrganizations", void 0);
exports.Tenant = Tenant = __decorate([
    (0, entity_1.MultiORMEntity)('tenant', { mikroOrmRepository: () => mikro_orm_tenant_repository_1.MikroOrmTenantRepository })
], Tenant);
//# sourceMappingURL=tenant.entity.js.map
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
var Feature_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feature = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_feature_repository_1 = require("./repository/mikro-orm-feature.repository");
let Feature = exports.Feature = Feature_1 = class Feature extends internal_1.BaseEntity {
    name;
    code;
    isPaid;
    description;
    image;
    link;
    status;
    icon;
    /** Additional virtual columns */
    isEnabled;
    imageUrl;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Feature
     */
    parent;
    parentId;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    /**
     * FeatureOrganization
     */
    featureOrganizations;
    /**
     * Feature
     */
    children;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Feature.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Feature.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean, default: false }),
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], Feature.prototype, "isPaid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Feature.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Feature.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Feature.prototype, "link", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Feature.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Feature.prototype, "icon", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", Boolean)
], Feature.prototype, "isEnabled", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", String)
], Feature.prototype, "imageUrl", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => Feature_1, (it) => it.children, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** Database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], Feature.prototype, "parent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.parent),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Feature.prototype, "parentId", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.FeatureOrganization, (it) => it.feature, {
        cascade: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Feature.prototype, "featureOrganizations", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => Feature_1, (it) => it.parent, {
        cascade: true
    }),
    (0, typeorm_1.JoinColumn)({ name: 'parentId' }),
    __metadata("design:type", Array)
], Feature.prototype, "children", void 0);
exports.Feature = Feature = Feature_1 = __decorate([
    (0, entity_1.MultiORMEntity)('feature', { mikroOrmRepository: () => mikro_orm_feature_repository_1.MikroOrmFeatureRepository })
], Feature);
//# sourceMappingURL=feature.entity.js.map
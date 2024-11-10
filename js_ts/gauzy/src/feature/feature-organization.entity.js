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
exports.FeatureOrganization = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const internal_1 = require("../core/entities/internal");
const class_validator_1 = require("class-validator");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_feature_organization_repository_1 = require("./repository/mikro-orm-feature-organization.repository");
let FeatureOrganization = exports.FeatureOrganization = class FeatureOrganization extends internal_1.TenantOrganizationBaseEntity {
    isEnabled;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Feature
     */
    feature;
    featureId;
};
__decorate([
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], FeatureOrganization.prototype, "isEnabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Feature }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Feature, (it) => it.featureOrganizations, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], FeatureOrganization.prototype, "feature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.feature),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", Object)
], FeatureOrganization.prototype, "featureId", void 0);
exports.FeatureOrganization = FeatureOrganization = __decorate([
    (0, entity_1.MultiORMEntity)('feature_organization', { mikroOrmRepository: () => mikro_orm_feature_organization_repository_1.MikroOrmFeatureOrganizationRepository })
], FeatureOrganization);
//# sourceMappingURL=feature-organization.entity.js.map
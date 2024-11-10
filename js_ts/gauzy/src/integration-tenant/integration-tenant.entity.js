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
exports.IntegrationTenant = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const index_1 = require("../../plugins/contracts/dist/index");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_integration_tenant_repository_1 = require("./repository/mikro-orm-integration-tenant.repository");
let IntegrationTenant = exports.IntegrationTenant = class IntegrationTenant extends internal_1.TenantOrganizationBaseEntity {
    name;
    // Date when the integration was synced
    lastSyncedAt;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Integration
     */
    integration;
    integrationId;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    /**
     * IntegrationSetting
     */
    settings;
    /**
     * IntegrationEntitySetting
     */
    entitySettings;
    /**
     * IntegrationMap
     */
    entityMaps;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.IntegrationEnum }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(index_1.IntegrationEnum),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], IntegrationTenant.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'string',
        format: 'date-time',
        example: '2018-11-21T06:20:32.232Z'
    }),
    (0, class_validator_1.IsDateString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], IntegrationTenant.prototype, "lastSyncedAt", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Integration, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** Database cascade action on delete. */
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], IntegrationTenant.prototype, "integration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.integration),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], IntegrationTenant.prototype, "integrationId", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.IntegrationSetting, (it) => it.integration, {
        cascade: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], IntegrationTenant.prototype, "settings", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.IntegrationEntitySetting, (it) => it.integration, {
        cascade: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], IntegrationTenant.prototype, "entitySettings", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.IntegrationMap, (it) => it.integration, {
        cascade: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], IntegrationTenant.prototype, "entityMaps", void 0);
exports.IntegrationTenant = IntegrationTenant = __decorate([
    (0, entity_1.MultiORMEntity)('integration_tenant', { mikroOrmRepository: () => mikro_orm_integration_tenant_repository_1.MikroOrmIntegrationTenantRepository })
], IntegrationTenant);
//# sourceMappingURL=integration-tenant.entity.js.map
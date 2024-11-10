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
exports.IntegrationEntitySetting = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const index_1 = require("../../plugins/contracts/dist/index");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_integration_entity_setting_repository_1 = require("./repository/mikro-orm-integration-entity-setting.repository");
let IntegrationEntitySetting = exports.IntegrationEntitySetting = class IntegrationEntitySetting extends internal_1.TenantOrganizationBaseEntity {
    entity;
    sync;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * IntegrationTenant
     */
    integration;
    integrationId;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    /**
     * IntegrationEntitySettingTied
     */
    tiedEntities;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.IntegrationEntity }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(index_1.IntegrationEntity),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], IntegrationEntitySetting.prototype, "entity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Boolean)
], IntegrationEntitySetting.prototype, "sync", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.IntegrationTenant }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.IntegrationTenant, (it) => it.entitySettings, {
        /** Database cascade action on delete. */
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], IntegrationEntitySetting.prototype, "integration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.integration),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", Object)
], IntegrationEntitySetting.prototype, "integrationId", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.IntegrationEntitySettingTied, (it) => it.integrationEntitySetting, {
        cascade: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], IntegrationEntitySetting.prototype, "tiedEntities", void 0);
exports.IntegrationEntitySetting = IntegrationEntitySetting = __decorate([
    (0, entity_1.MultiORMEntity)('integration_entity_setting', { mikroOrmRepository: () => mikro_orm_integration_entity_setting_repository_1.MikroOrmIntegrationEntitySettingRepository })
], IntegrationEntitySetting);
//# sourceMappingURL=integration-entity-setting.entity.js.map
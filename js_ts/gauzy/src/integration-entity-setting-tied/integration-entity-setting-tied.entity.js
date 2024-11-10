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
exports.IntegrationEntitySettingTied = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const index_1 = require("../../plugins/contracts/dist/index");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_integration_entity_setting_tied_repository_1 = require("./repository/mikro-orm-integration-entity-setting-tied.repository");
let IntegrationEntitySettingTied = exports.IntegrationEntitySettingTied = class IntegrationEntitySettingTied extends internal_1.TenantOrganizationBaseEntity {
    entity;
    sync;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * IntegrationEntitySetting
     */
    integrationEntitySetting;
    integrationEntitySettingId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.IntegrationEntity }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(index_1.IntegrationEntity),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], IntegrationEntitySettingTied.prototype, "entity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Boolean)
], IntegrationEntitySettingTied.prototype, "sync", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.IntegrationEntitySetting, (it) => it.tiedEntities, {
        /** Database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], IntegrationEntitySettingTied.prototype, "integrationEntitySetting", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.integrationEntitySetting),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], IntegrationEntitySettingTied.prototype, "integrationEntitySettingId", void 0);
exports.IntegrationEntitySettingTied = IntegrationEntitySettingTied = __decorate([
    (0, entity_1.MultiORMEntity)('integration_entity_setting_tied', { mikroOrmRepository: () => mikro_orm_integration_entity_setting_tied_repository_1.MikroOrmIntegrationEntitySettingTiedRepository })
], IntegrationEntitySettingTied);
//# sourceMappingURL=integration-entity-setting-tied.entity.js.map
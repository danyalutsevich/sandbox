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
exports.IntegrationSetting = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const internal_1 = require("./../core/entities/internal");
const decorators_1 = require("./../core/decorators");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_integration_setting_repository_1 = require("./repository/mikro-orm-integration-setting.repository");
let IntegrationSetting = exports.IntegrationSetting = class IntegrationSetting extends internal_1.TenantOrganizationBaseEntity {
    settingsName;
    settingsValue;
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
    /**
     * Additional fields to expose secret fields
     */
    wrapSecretKey;
    wrapSecretValue;
};
__decorate([
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], IntegrationSetting.prototype, "settingsName", void 0);
__decorate([
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], IntegrationSetting.prototype, "settingsValue", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.IntegrationTenant, (it) => it.settings, {
        /** Database cascade action on delete. */
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", internal_1.IntegrationTenant)
], IntegrationSetting.prototype, "integration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.integration),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", Object)
], IntegrationSetting.prototype, "integrationId", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ toPlainOnly: true, name: 'settingsName' }),
    (0, decorators_1.IsSecret)(),
    __metadata("design:type", String)
], IntegrationSetting.prototype, "wrapSecretKey", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ toPlainOnly: true, name: 'settingsValue' }),
    (0, decorators_1.IsSecret)(),
    __metadata("design:type", String)
], IntegrationSetting.prototype, "wrapSecretValue", void 0);
exports.IntegrationSetting = IntegrationSetting = __decorate([
    (0, entity_1.MultiORMEntity)('integration_setting', { mikroOrmRepository: () => mikro_orm_integration_setting_repository_1.MikroOrmIntegrationSettingRepository })
], IntegrationSetting);
//# sourceMappingURL=integration-setting.entity.js.map
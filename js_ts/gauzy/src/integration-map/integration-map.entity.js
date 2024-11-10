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
exports.IntegrationMap = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/contracts/dist/index");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_integration_map_repository_1 = require("./repository/mikro-orm-integration-map.repository");
let IntegrationMap = exports.IntegrationMap = class IntegrationMap extends internal_1.TenantOrganizationBaseEntity {
    entity;
    sourceId;
    gauzyId;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    integration;
    integrationId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.IntegrationEntity }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], IntegrationMap.prototype, "entity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], IntegrationMap.prototype, "sourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], IntegrationMap.prototype, "gauzyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.IntegrationTenant }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.IntegrationTenant, (it) => it.entityMaps, {
        /** Database cascade action on delete. */
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], IntegrationMap.prototype, "integration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.integration),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", Object)
], IntegrationMap.prototype, "integrationId", void 0);
exports.IntegrationMap = IntegrationMap = __decorate([
    (0, entity_1.MultiORMEntity)('integration_map', { mikroOrmRepository: () => mikro_orm_integration_map_repository_1.MikroOrmIntegrationMapRepository })
], IntegrationMap);
//# sourceMappingURL=integration-map.entity.js.map
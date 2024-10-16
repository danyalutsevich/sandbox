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
exports.TenantOrganizationBaseEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const internal_1 = require("../entities/internal");
const relations_1 = require("../decorators/entity/relations");
const decorators_1 = require("../decorators");
const column_index_decorator_1 = require("../decorators/entity/column-index.decorator");
class TenantOrganizationBaseEntity extends internal_1.TenantBaseEntity {
    organization;
    organizationId;
}
exports.TenantOrganizationBaseEntity = TenantOrganizationBaseEntity;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.Organization }),
    (0, class_validator_1.IsOptional)(),
    (0, relations_1.MultiORMManyToOne)(() => internal_1.Organization, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** Database cascade action on update. */
        onUpdate: 'CASCADE',
        /** Database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], TenantOrganizationBaseEntity.prototype, "organization", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.RelationId)((it) => it.organization),
    (0, column_index_decorator_1.ColumnIndex)(),
    (0, decorators_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], TenantOrganizationBaseEntity.prototype, "organizationId", void 0);
//# sourceMappingURL=tenant-organization-base.entity.js.map
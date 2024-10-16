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
exports.TaskVersion = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const internal_1 = require("../../core/entities/internal");
const entity_1 = require("../../core/decorators/entity");
const mikro_orm_task_version_repository_1 = require("./repository/mikro-orm-task-version.repository");
let TaskVersion = exports.TaskVersion = class TaskVersion extends internal_1.TenantOrganizationBaseEntity {
    name;
    value;
    description;
    icon;
    color;
    isSystem;
    /** Additional virtual columns */
    fullIconUrl;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Organization Project Relationship
     */
    project;
    /**
     * Organization Project ID
     */
    projectId;
    /**
     * Organization Team Relationship
     */
    organizationTeam;
    /**
     * Organization Team ID
     */
    organizationTeamId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], TaskVersion.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], TaskVersion.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], TaskVersion.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], TaskVersion.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], TaskVersion.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: false }),
    (0, entity_1.MultiORMColumn)({ default: false, update: false }),
    __metadata("design:type", Boolean)
], TaskVersion.prototype, "isSystem", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", String)
], TaskVersion.prototype, "fullIconUrl", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationProject, (it) => it.versions, {
        /** Indicates if the relation column value can be nullable or not. */
        nullable: true,
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], TaskVersion.prototype, "project", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.project),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], TaskVersion.prototype, "projectId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationTeam, (it) => it.versions, {
        /** Indicates if the relation column value can be nullable or not. */
        nullable: true,
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], TaskVersion.prototype, "organizationTeam", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.organizationTeam),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], TaskVersion.prototype, "organizationTeamId", void 0);
exports.TaskVersion = TaskVersion = __decorate([
    (0, entity_1.MultiORMEntity)('task_version', { mikroOrmRepository: () => mikro_orm_task_version_repository_1.MikroOrmTaskVersionRepository })
], TaskVersion);
//# sourceMappingURL=version.entity.js.map
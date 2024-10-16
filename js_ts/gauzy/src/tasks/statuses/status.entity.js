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
exports.TaskStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const knex_1 = require("@mikro-orm/knex");
const class_validator_1 = require("class-validator");
const internal_1 = require("../../core/entities/internal");
const entity_1 = require("../../core/decorators/entity");
const repository_1 = require("./repository");
let TaskStatus = exports.TaskStatus = class TaskStatus extends internal_1.TenantOrganizationBaseEntity {
    [knex_1.EntityRepositoryType];
    name;
    value;
    description;
    order;
    icon;
    color;
    isSystem;
    isCollapsed;
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
     * Organization Team
     */
    organizationTeam;
    organizationTeamId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], TaskStatus.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], TaskStatus.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], TaskStatus.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], TaskStatus.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], TaskStatus.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], TaskStatus.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: false }),
    (0, entity_1.MultiORMColumn)({ default: false, update: false }),
    __metadata("design:type", Boolean)
], TaskStatus.prototype, "isSystem", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: false }),
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], TaskStatus.prototype, "isCollapsed", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", String)
], TaskStatus.prototype, "fullIconUrl", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationProject, (it) => it.statuses, {
        /** Indicates if the relation column value can be nullable or not. */
        nullable: true,
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], TaskStatus.prototype, "project", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.project),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], TaskStatus.prototype, "projectId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationTeam, (it) => it.statuses, {
        /** Indicates if the relation column value can be nullable or not. */
        nullable: true,
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], TaskStatus.prototype, "organizationTeam", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.organizationTeam),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], TaskStatus.prototype, "organizationTeamId", void 0);
exports.TaskStatus = TaskStatus = __decorate([
    (0, entity_1.MultiORMEntity)('task_status', { mikroOrmRepository: () => repository_1.MikroOrmTaskStatusRepository })
], TaskStatus);
//# sourceMappingURL=status.entity.js.map
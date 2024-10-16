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
exports.TaskRelatedIssueType = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const internal_1 = require("../../core/entities/internal");
const entity_1 = require("./../../core/decorators/entity");
const mikro_orm_related_issue_type_repository_1 = require("./repository/mikro-orm-related-issue-type.repository");
let TaskRelatedIssueType = exports.TaskRelatedIssueType = class TaskRelatedIssueType extends internal_1.TenantOrganizationBaseEntity {
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
], TaskRelatedIssueType.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], TaskRelatedIssueType.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], TaskRelatedIssueType.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], TaskRelatedIssueType.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], TaskRelatedIssueType.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: false }),
    (0, entity_1.MultiORMColumn)({ default: false, update: false }),
    __metadata("design:type", Boolean)
], TaskRelatedIssueType.prototype, "isSystem", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", String)
], TaskRelatedIssueType.prototype, "fullIconUrl", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationProject, (it) => it.relatedIssueTypes, {
        /** Indicates if the relation column value can be nullable or not. */
        nullable: true,
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Object)
], TaskRelatedIssueType.prototype, "project", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.project),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], TaskRelatedIssueType.prototype, "projectId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationTeam, (it) => it.relatedIssueTypes, {
        /** Indicates if the relation column value can be nullable or not. */
        nullable: true,
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Object)
], TaskRelatedIssueType.prototype, "organizationTeam", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.organizationTeam),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], TaskRelatedIssueType.prototype, "organizationTeamId", void 0);
exports.TaskRelatedIssueType = TaskRelatedIssueType = __decorate([
    (0, entity_1.MultiORMEntity)('task_related_issue_type', { mikroOrmRepository: () => mikro_orm_related_issue_type_repository_1.MikroOrmTaskRelatedIssueTypeRepository })
], TaskRelatedIssueType);
//# sourceMappingURL=related-issue-type.entity.js.map
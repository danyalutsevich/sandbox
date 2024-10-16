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
exports.IssueType = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const internal_1 = require("./../../core/entities/internal");
const entity_1 = require("./../../core/decorators/entity");
const mikro_orm_issue_type_repository_1 = require("./repository/mikro-orm-issue-type.repository");
let IssueType = exports.IssueType = class IssueType extends internal_1.TenantOrganizationBaseEntity {
    name;
    value;
    description;
    icon;
    color;
    isDefault;
    isSystem;
    /** Additional virtual columns */
    fullIconUrl;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Image Asset
     */
    image;
    imageId;
    /**
     * Organization Project
     */
    project;
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
], IssueType.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], IssueType.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], IssueType.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], IssueType.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], IssueType.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], IssueType.prototype, "isDefault", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: false }),
    (0, entity_1.MultiORMColumn)({ default: false, update: false }),
    __metadata("design:type", Boolean)
], IssueType.prototype, "isSystem", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", String)
], IssueType.prototype, "fullIconUrl", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.ImageAsset, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** Database cascade action on delete. */
        onDelete: 'SET NULL',
        /** Eager relations are always loaded automatically when relation's owner entity is loaded using find* methods. */
        eager: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], IssueType.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.image),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], IssueType.prototype, "imageId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationProject, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], IssueType.prototype, "project", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.project),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], IssueType.prototype, "projectId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationTeam, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], IssueType.prototype, "organizationTeam", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.organizationTeam),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], IssueType.prototype, "organizationTeamId", void 0);
exports.IssueType = IssueType = __decorate([
    (0, entity_1.MultiORMEntity)('issue_type', { mikroOrmRepository: () => mikro_orm_issue_type_repository_1.MikroOrmIssueTypeRepository })
], IssueType);
//# sourceMappingURL=issue-type.entity.js.map
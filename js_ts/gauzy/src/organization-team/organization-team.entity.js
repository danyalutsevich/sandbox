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
exports.OrganizationTeam = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_organization_team_repository_1 = require("./repository/mikro-orm-organization-team.repository");
let OrganizationTeam = exports.OrganizationTeam = class OrganizationTeam extends internal_1.TenantOrganizationBaseEntity {
    /**
     * Team name
     */
    name;
    /**
     * Team color (optional)
     */
    color;
    /**
     * Team emoji (optional)
     */
    emoji;
    /**
     * Optional property representing the team size.
     */
    teamSize;
    /**
     * Optional property representing the logo of the organization team.
     */
    logo;
    /**
     * Optional property representing the prefix for the organization team.
     */
    prefix;
    /**
     * Optional property representing the team sharing profile views between employees
     * Default value is set to true
     */
    shareProfileView;
    /**
     * Optional property representing the team time tracking required by existing of a daily plan
     * Default value is set to false
     */
    requirePlanToTrack;
    /**
     * Optional property representing the team type (boolean true/false).
     * Default value is set to false.
     */
    public;
    /**
     * Optional property representing the profile link for the organization team.
     */
    profile_link;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * User
     */
    createdBy;
    createdById;
    /**
     * ImageAsset
     */
    image;
    imageId;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    /**
     * OrganizationTeamEmployee
     */
    members;
    /**
     * RequestApprovalTeam
     */
    requestApprovals;
    /**
     * Goal
     */
    goals;
    /**
     * Team Statuses
     */
    statuses;
    /**
     * Team Related Status type
     */
    relatedIssueTypes;
    /**
     * Team Priorities
     */
    priorities;
    /**
     * Team Sizes
     */
    sizes;
    /**
     * Team Versions
     */
    versions;
    /**
     * Team Labels
     */
    labels;
    /**
     * Team Issue Types
     */
    issueTypes;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    tags;
    /**
     * Task
     */
    tasks;
    /**
     * Equipment Sharing
     */
    equipmentSharings;
    /**
     * Organization Project
     */
    projects;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], OrganizationTeam.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationTeam.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationTeam.prototype, "emoji", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationTeam.prototype, "teamSize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationTeam.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationTeam.prototype, "prefix", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, default: true }),
    __metadata("design:type", Boolean)
], OrganizationTeam.prototype, "shareProfileView", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], OrganizationTeam.prototype, "requirePlanToTrack", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], OrganizationTeam.prototype, "public", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationTeam.prototype, "profile_link", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.User, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** Database cascade action on delete. */
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], OrganizationTeam.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.RelationId)((it) => it.createdBy),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], OrganizationTeam.prototype, "createdById", void 0);
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
], OrganizationTeam.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.image),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], OrganizationTeam.prototype, "imageId", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.OrganizationTeamEmployee, (it) => it.organizationTeam, {
        /** If set to true then it means that related object can be allowed to be inserted or updated in the database. */
        cascade: true
    }),
    __metadata("design:type", Array)
], OrganizationTeam.prototype, "members", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.RequestApprovalTeam, (it) => it.team),
    __metadata("design:type", Array)
], OrganizationTeam.prototype, "requestApprovals", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Goal, (it) => it.ownerTeam),
    __metadata("design:type", Array)
], OrganizationTeam.prototype, "goals", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.TaskStatus, (status) => status.organizationTeam),
    __metadata("design:type", Array)
], OrganizationTeam.prototype, "statuses", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.TaskRelatedIssueType, (it) => it.organizationTeam),
    __metadata("design:type", Array)
], OrganizationTeam.prototype, "relatedIssueTypes", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.TaskPriority, (it) => it.organizationTeam),
    __metadata("design:type", Array)
], OrganizationTeam.prototype, "priorities", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.TaskSize, (it) => it.organizationTeam),
    __metadata("design:type", Array)
], OrganizationTeam.prototype, "sizes", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.TaskVersion, (it) => it.organizationTeam),
    __metadata("design:type", Array)
], OrganizationTeam.prototype, "versions", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Tag, (it) => it.organizationTeam),
    __metadata("design:type", Array)
], OrganizationTeam.prototype, "labels", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.IssueType, (it) => it.organizationTeam),
    __metadata("design:type", Array)
], OrganizationTeam.prototype, "issueTypes", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Tag, (it) => it.organizationTeams, {
        /** Defines the database action to perform on update. */
        onUpdate: 'CASCADE',
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'tag_organization_team',
        joinColumn: 'organizationTeamId',
        inverseJoinColumn: 'tagId'
    }),
    (0, typeorm_1.JoinTable)({
        name: 'tag_organization_team'
    }),
    __metadata("design:type", Array)
], OrganizationTeam.prototype, "tags", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Task, (it) => it.teams, {
        /** Defines the database action to perform on update. */
        onUpdate: 'CASCADE',
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], OrganizationTeam.prototype, "tasks", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.EquipmentSharing, (it) => it.teams, {
        /** Defines the database action to perform on update. */
        onUpdate: 'CASCADE',
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], OrganizationTeam.prototype, "equipmentSharings", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.OrganizationProject, (it) => it.teams, {
        /** Defines the database action to perform on update. */
        onUpdate: 'CASCADE',
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], OrganizationTeam.prototype, "projects", void 0);
exports.OrganizationTeam = OrganizationTeam = __decorate([
    (0, entity_1.MultiORMEntity)('organization_team', { mikroOrmRepository: () => mikro_orm_organization_team_repository_1.MikroOrmOrganizationTeamRepository })
], OrganizationTeam);
//# sourceMappingURL=organization-team.entity.js.map
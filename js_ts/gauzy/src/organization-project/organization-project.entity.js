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
exports.OrganizationProject = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/config/dist/index");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_organization_project_repository_1 = require("./repository/mikro-orm-organization-project.repository");
let OrganizationProject = exports.OrganizationProject = class OrganizationProject extends internal_1.TenantOrganizationBaseEntity {
    name;
    startDate;
    endDate;
    billing;
    currency;
    public;
    owner;
    taskListType;
    code;
    description;
    color;
    billable;
    billingFlat;
    openSource;
    projectUrl;
    openSourceProjectUrl;
    budget;
    budgetType;
    membersCount;
    imageUrl;
    isTasksAutoSync;
    isTasksAutoSyncOnLabel;
    syncTag;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * OrganizationGithubRepository Relationship
     */
    repository;
    /**
     * Repository ID
     */
    repositoryId;
    /**
     * Organization Contact Relationship
     */
    organizationContact;
    /**
     * Organization Contact ID
     */
    organizationContactId;
    /**
     * ImageAsset Relationship
     */
    image;
    /**
     * Image Asset ID
     */
    imageId;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    /**
     * Organization Tasks Relationship
     */
    tasks;
    /**
     * TimeLog Relationship
     */
    timeLogs;
    /**
     * Organization Invoice Items Relationship
     */
    invoiceItems;
    /**
     * Organization Sprints Relationship
     */
    organizationSprints;
    /**
     * Organization Payments Relationship
     */
    payments;
    /**
     * Expense Relationship
     */
    expenses;
    /**
     * Activity Relationship
     */
    activities;
    /**
     * Project Statuses
     */
    statuses;
    /**
     * Project Related Issue Type Relationship
     */
    relatedIssueTypes;
    /**
     * Project Priorities Relationship
     */
    priorities;
    /**
     * Project Sizes Relationship
     */
    sizes;
    /**
     * Project Versions Relationship
     */
    versions;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    /**
     * Tags Relationship
     */
    tags;
    /**
     * Project Members Relationship
     */
    members;
    /**
     * Organization Teams Relationship
     */
    teams;
};
__decorate([
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], OrganizationProject.prototype, "name", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], OrganizationProject.prototype, "startDate", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], OrganizationProject.prototype, "endDate", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationProject.prototype, "billing", void 0);
__decorate([
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationProject.prototype, "currency", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], OrganizationProject.prototype, "public", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationProject.prototype, "owner", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ default: index_1.TaskListTypeEnum.GRID }),
    __metadata("design:type", String)
], OrganizationProject.prototype, "taskListType", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationProject.prototype, "code", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationProject.prototype, "description", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationProject.prototype, "color", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], OrganizationProject.prototype, "billable", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], OrganizationProject.prototype, "billingFlat", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], OrganizationProject.prototype, "openSource", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationProject.prototype, "projectUrl", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationProject.prototype, "openSourceProjectUrl", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], OrganizationProject.prototype, "budget", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        default: index_1.OrganizationProjectBudgetTypeEnum.COST,
        ...((0, index_2.isMySQL)() ?
            { type: 'enum', enum: index_1.OrganizationProjectBudgetTypeEnum }
            : { type: 'text' })
    }),
    __metadata("design:type", String)
], OrganizationProject.prototype, "budgetType", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], OrganizationProject.prototype, "membersCount", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], OrganizationProject.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ default: true, nullable: true }),
    __metadata("design:type", Boolean)
], OrganizationProject.prototype, "isTasksAutoSync", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ default: true, nullable: true }),
    __metadata("design:type", Boolean)
], OrganizationProject.prototype, "isTasksAutoSyncOnLabel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationProject.prototype, "syncTag", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationGithubRepository, (it) => it.projects, {
        /** Indicates if the relation column value can be nullable or not. */
        nullable: true,
        /** Defines the database cascade action on delete. */
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], OrganizationProject.prototype, "repository", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.repository),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], OrganizationProject.prototype, "repositoryId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationContact, (it) => it.projects, {
        /** Indicates if the relation column value can be nullable or not. */
        nullable: true,
        /** Defines the database action to perform on update. */
        onUpdate: 'CASCADE',
        /** Defines the database cascade action on delete. */
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], OrganizationProject.prototype, "organizationContact", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.organizationContact),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], OrganizationProject.prototype, "organizationContactId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.ImageAsset, {
        /** Indicates if the relation column value can be nullable or not. */
        nullable: true,
        /** Defines the database cascade action on delete. */
        onDelete: 'SET NULL',
        /** Eager relations are always loaded automatically when relation's owner entity is loaded using find* methods. */
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], OrganizationProject.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.image),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], OrganizationProject.prototype, "imageId", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Task, (it) => it.project),
    __metadata("design:type", Array)
], OrganizationProject.prototype, "tasks", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.TimeLog, (it) => it.project),
    __metadata("design:type", Array)
], OrganizationProject.prototype, "timeLogs", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.InvoiceItem, (it) => it.project),
    __metadata("design:type", Array)
], OrganizationProject.prototype, "invoiceItems", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.OrganizationSprint, (it) => it.project),
    __metadata("design:type", Array)
], OrganizationProject.prototype, "organizationSprints", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Payment, (it) => it.project),
    __metadata("design:type", Array)
], OrganizationProject.prototype, "payments", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Expense, (it) => it.project),
    __metadata("design:type", Array)
], OrganizationProject.prototype, "expenses", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Activity, (it) => it.project),
    __metadata("design:type", Array)
], OrganizationProject.prototype, "activities", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.TaskStatus, (it) => it.project),
    __metadata("design:type", Array)
], OrganizationProject.prototype, "statuses", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.TaskRelatedIssueType, (it) => it.project),
    __metadata("design:type", Array)
], OrganizationProject.prototype, "relatedIssueTypes", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.TaskPriority, (it) => it.project),
    __metadata("design:type", Array)
], OrganizationProject.prototype, "priorities", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.TaskSize, (it) => it.project),
    __metadata("design:type", Array)
], OrganizationProject.prototype, "sizes", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.TaskVersion, (it) => it.project),
    __metadata("design:type", Array)
], OrganizationProject.prototype, "versions", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Tag, (it) => it.organizationProjects, {
        /** Defines the database action to perform on update. */
        onUpdate: 'CASCADE',
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'tag_organization_project',
        joinColumn: 'organizationProjectId',
        inverseJoinColumn: 'tagId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'tag_organization_project',
    }),
    __metadata("design:type", Array)
], OrganizationProject.prototype, "tags", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Employee, (it) => it.projects, {
        /** Defines the database action to perform on update. */
        onUpdate: 'CASCADE',
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], OrganizationProject.prototype, "members", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.OrganizationTeam, (it) => it.projects, {
        /** Defines the database action to perform on update. */
        onUpdate: 'CASCADE',
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'organization_project_team',
        joinColumn: 'organizationProjectId',
        inverseJoinColumn: 'organizationTeamId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'organization_project_team'
    }),
    __metadata("design:type", Array)
], OrganizationProject.prototype, "teams", void 0);
exports.OrganizationProject = OrganizationProject = __decorate([
    (0, entity_1.MultiORMEntity)('organization_project', { mikroOrmRepository: () => mikro_orm_organization_project_repository_1.MikroOrmOrganizationProjectRepository })
], OrganizationProject);
//# sourceMappingURL=organization-project.entity.js.map
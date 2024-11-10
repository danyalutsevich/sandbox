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
exports.Tag = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const core_1 = require("@mikro-orm/core");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("../core/decorators/entity");
const tag_1 = require("../core/entities/custom-entity-fields/tag");
const mikro_orm_tag_repository_1 = require("./repository/mikro-orm-tag.repository");
let Tag = exports.Tag = class Tag extends internal_1.TenantOrganizationBaseEntity {
    [core_1.EntityRepositoryType];
    name;
    color;
    textColor;
    description;
    icon;
    isSystem;
    fullIconUrl;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Organization Team
     */
    organizationTeam;
    organizationTeamId;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    /**
     * Candidate
     */
    candidates;
    /**
     * Employee
     */
    employees;
    /**
     * Equipment
     */
    equipments;
    /**
     * EventType
     */
    eventTypes;
    /**
     * Income
     */
    incomes;
    /**
     * Expense
     */
    expenses;
    /**
     * Invoice
     */
    invoices;
    /**
     * Income
     */
    tasks;
    /**
     * OrganizationVendor
     */
    organizationVendors;
    /**
     * OrganizationTeam
     */
    organizationTeams;
    /**
     * OrganizationProject
     */
    organizationProjects;
    /**
     * OrganizationPosition
     */
    organizationPositions;
    /**
     * ExpenseCategory
     */
    expenseCategories;
    /**
     * OrganizationEmploymentType
     */
    organizationEmploymentTypes;
    /**
     * EmployeeLevel
     */
    employeeLevels;
    /**
     * OrganizationDepartment
     */
    organizationDepartments;
    /**
     * OrganizationContact
     */
    organizationContacts;
    /**
     * Product
     */
    products;
    /**
     * Payment
     */
    payments;
    /**
     * RequestApproval
     */
    requestApprovals;
    /**
     * User
     */
    users;
    /**
     * Integration
     */
    integrations;
    /**
     * Merchant
     */
    merchants;
    /**
     * Warehouse
     */
    warehouses;
    /**
     * Organization
     */
    organizations;
    /*
    |--------------------------------------------------------------------------
    | Embeddable Columns
    |--------------------------------------------------------------------------
    */
    customFields;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Tag.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Tag.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Tag.prototype, "textColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Tag.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Tag.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: false }),
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], Tag.prototype, "isSystem", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", String)
], Tag.prototype, "fullIconUrl", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationTeam, (it) => it.labels, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** Database cascade action on delete. */
        onDelete: 'SET NULL'
    }),
    __metadata("design:type", Object)
], Tag.prototype, "organizationTeam", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.organizationTeam),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], Tag.prototype, "organizationTeamId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Candidate, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "candidates", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Employee, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "employees", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Equipment, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "equipments", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.EventType, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "eventTypes", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Income, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "incomes", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Expense, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "expenses", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Invoice, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "invoices", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Task, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "tasks", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.OrganizationVendor, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "organizationVendors", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.OrganizationTeam, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "organizationTeams", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.OrganizationProject, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "organizationProjects", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.OrganizationPosition, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "organizationPositions", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.ExpenseCategory, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "expenseCategories", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.OrganizationEmploymentType, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "organizationEmploymentTypes", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.EmployeeLevel, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "employeeLevels", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.OrganizationDepartment, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "organizationDepartments", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.OrganizationContact, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "organizationContacts", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Product, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "products", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Payment, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "payments", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.RequestApproval, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "requestApprovals", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.User, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "users", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Integration, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "integrations", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Merchant, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "merchants", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Warehouse, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "warehouses", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Organization, (it) => it.tags, {
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Tag.prototype, "organizations", void 0);
__decorate([
    (0, entity_1.EmbeddedColumn)({
        mikroOrmEmbeddableEntity: () => tag_1.MikroOrmTagEntityCustomFields,
        typeOrmEmbeddableEntity: () => tag_1.TypeOrmTagEntityCustomFields
    }),
    __metadata("design:type", Object)
], Tag.prototype, "customFields", void 0);
exports.Tag = Tag = __decorate([
    (0, entity_1.MultiORMEntity)('tag', { mikroOrmRepository: () => mikro_orm_tag_repository_1.MikroOrmTagRepository })
], Tag);
//# sourceMappingURL=tag.entity.js.map
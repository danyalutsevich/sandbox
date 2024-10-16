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
exports.OrganizationContact = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const index_1 = require("../../plugins/contracts/dist/index");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_organization_contact_repository_1 = require("./repository/mikro-orm-organization-contact.repository");
let OrganizationContact = exports.OrganizationContact = class OrganizationContact extends internal_1.TenantOrganizationBaseEntity {
    name;
    primaryEmail;
    primaryPhone;
    inviteStatus;
    notes;
    contactType;
    imageUrl;
    budget;
    budgetType;
    createdBy;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Contact
     */
    contact;
    contactId;
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
     * Organization Projects Relationship
     */
    projects;
    // Organization Invoices
    invoices;
    // Organization Payments
    payments;
    /**
     * Expense
     */
    expenses;
    /**
     * Income
     */
    incomes;
    /**
     * TimeLog
     */
    timeLogs;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    // Organization Contact Tags
    tags;
    // Organization Contact Employees
    members;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], OrganizationContact.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationContact.prototype, "primaryEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationContact.prototype, "primaryPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.ContactOrganizationInviteStatus }),
    (0, entity_1.MultiORMColumn)({ type: 'simple-enum', nullable: true, enum: index_1.ContactOrganizationInviteStatus }),
    __metadata("design:type", String)
], OrganizationContact.prototype, "inviteStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationContact.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.ContactType }),
    (0, entity_1.MultiORMColumn)({ type: 'simple-enum', enum: index_1.ContactType, default: index_1.ContactType.CLIENT }),
    __metadata("design:type", String)
], OrganizationContact.prototype, "contactType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, maxLength: 500 }),
    (0, entity_1.MultiORMColumn)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], OrganizationContact.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], OrganizationContact.prototype, "budget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({
        type: 'simple-enum',
        nullable: true,
        enum: index_1.OrganizationContactBudgetTypeEnum,
        default: index_1.OrganizationContactBudgetTypeEnum.COST
    }),
    __metadata("design:type", String)
], OrganizationContact.prototype, "budgetType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationContact.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Contact }),
    (0, entity_1.MultiORMOneToOne)(() => internal_1.Contact, (contact) => contact.organizationContact, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** If set to true then it means that related object can be allowed to be inserted or updated in the database. */
        cascade: true,
        /** Database cascade action on delete. */
        onDelete: 'SET NULL',
        /** This column is a boolean flag indicating whether the current entity is the 'owning' side of a relationship.  */
        owner: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], OrganizationContact.prototype, "contact", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.contact),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], OrganizationContact.prototype, "contactId", void 0);
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
], OrganizationContact.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.image),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], OrganizationContact.prototype, "imageId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.OrganizationProject, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.OrganizationProject, (it) => it.organizationContact, {
        cascade: true
    }),
    __metadata("design:type", Array)
], OrganizationContact.prototype, "projects", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.Invoice, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Invoice, (it) => it.toContact),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], OrganizationContact.prototype, "invoices", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.Payment, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Payment, (it) => it.organizationContact, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], OrganizationContact.prototype, "payments", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.Expense, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Expense, (it) => it.organizationContact, {
        onDelete: 'SET NULL'
    }),
    __metadata("design:type", Array)
], OrganizationContact.prototype, "expenses", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.Income, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Income, (it) => it.client, {
        onDelete: 'SET NULL'
    }),
    __metadata("design:type", Array)
], OrganizationContact.prototype, "incomes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.TimeLog, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.TimeLog, (it) => it.organizationContact),
    __metadata("design:type", Array)
], OrganizationContact.prototype, "timeLogs", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Tag, (tag) => tag.organizationContacts, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'tag_organization_contact',
        joinColumn: 'organizationContactId',
        inverseJoinColumn: 'tagId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'tag_organization_contact'
    }),
    __metadata("design:type", Array)
], OrganizationContact.prototype, "tags", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Employee, (it) => it.organizationContacts, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'organization_contact_employee',
        joinColumn: 'organizationContactId',
        inverseJoinColumn: 'employeeId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'organization_contact_employee'
    }),
    __metadata("design:type", Array)
], OrganizationContact.prototype, "members", void 0);
exports.OrganizationContact = OrganizationContact = __decorate([
    (0, entity_1.MultiORMEntity)('organization_contact', { mikroOrmRepository: () => mikro_orm_organization_contact_repository_1.MikroOrmOrganizationContactRepository })
], OrganizationContact);
//# sourceMappingURL=organization-contact.entity.js.map
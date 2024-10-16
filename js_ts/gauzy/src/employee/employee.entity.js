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
exports.Employee = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const core_1 = require("@mikro-orm/core");
const class_validator_1 = require("class-validator");
const index_1 = require("../../plugins/contracts/dist/index");
const entity_1 = require("../core/decorators/entity");
const internal_1 = require("../core/entities/internal");
const employee_1 = require("../core/entities/custom-entity-fields/employee");
const pipes_1 = require("../shared/pipes");
const mikro_orm_employee_repository_1 = require("./repository/mikro-orm-employee.repository");
let Employee = exports.Employee = class Employee extends internal_1.TenantOrganizationBaseEntity {
    [core_1.EntityRepositoryType];
    valueDate;
    short_description;
    description;
    startedWorkOn;
    endWork;
    payPeriod;
    billRateValue;
    minimumBillingRate;
    billRateCurrency;
    reWeeklyLimit;
    offerDate;
    acceptDate;
    rejectDate;
    employeeLevel;
    anonymousBonus;
    averageIncome;
    averageBonus;
    totalWorkHours;
    averageExpenses;
    show_anonymous_bonus;
    show_average_bonus;
    show_average_expenses;
    show_average_income;
    show_billrate;
    show_payperiod;
    show_start_work_on;
    isJobSearchActive;
    linkedInUrl;
    facebookUrl;
    instagramUrl;
    twitterUrl;
    githubUrl;
    gitlabUrl;
    upworkUrl;
    stackoverflowUrl;
    isVerified;
    isVetted;
    totalJobs;
    jobSuccess;
    profile_link;
    /**
     * Enabled/Disabled Time Tracking Feature
     */
    isTrackingEnabled;
    /**
     * Employee status (Online/Offline)
     */
    isOnline;
    isAway;
    /**
     * Employee time tracking status
     */
    isTrackingTime;
    /**
     * Enabled/Disabled Screen Capture Feature
     */
    allowScreenshotCapture;
    /** Upwork ID */
    upworkId;
    /** LinkedIn ID */
    linkedInId;
    /** Additional virtual columns */
    fullName;
    isDeleted;
    /*
    |--------------------------------------------------------------------------
    | @OneToOne
    |--------------------------------------------------------------------------
    */
    /**
     * User
     */
    user;
    userId;
    /**
     * Contact
     */
    contact;
    contactId;
    /**
     * Candidate
     */
    candidate;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    // Employee Organization Position
    organizationPosition;
    organizationPositionId;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    // Employee Teams
    teams;
    /**
     * Estimations
     */
    estimations;
    /**
     * Time Tracking (Timesheets)
     */
    timesheets;
    /**
     * Time Tracking (Time Logs)
     */
    timeLogs;
    /**
     * Time Tracking (Time Slots)
     */
    timeSlots;
    invoiceItems;
    requestApprovals;
    settings;
    expenses;
    /**
     * Goal
     */
    goals;
    /**
     * Lead
     */
    leads;
    /**
     * Awards
     */
    awards;
    /**
     * Phone Numbers
     */
    phoneNumbers;
    dailyPlans;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    /**
     * Employee Organization Projects
     */
    projects;
    /**
     * Employee Tags
     */
    tags;
    /**
     * Employee Skills
     */
    skills;
    /**
     * Organization Departments
     */
    organizationDepartments;
    /**
     * Organization Employment Types
     */
    organizationEmploymentTypes;
    /**
     * Employee Organization Contacts
     */
    organizationContacts;
    /**
     * TimeOffPolicy
     */
    timeOffPolicies;
    /**
     * TimeOffRequest
     */
    timeOffRequests;
    /**
     * Task
     */
    tasks;
    /**
     * Equipment Sharing
     */
    equipmentSharings;
    /*
    |--------------------------------------------------------------------------
    | Embeddable Columns
    |--------------------------------------------------------------------------
    */
    customFields;
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Employee.prototype, "valueDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, maxLength: 200 }),
    (0, entity_1.MultiORMColumn)({ length: 200, nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "short_description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Employee.prototype, "startedWorkOn", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Employee.prototype, "endWork", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.PayPeriodEnum }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "payPeriod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], Employee.prototype, "billRateValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], Employee.prototype, "minimumBillingRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.CurrenciesEnum }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "billRateCurrency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], Employee.prototype, "reWeeklyLimit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Employee.prototype, "offerDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Employee.prototype, "acceptDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Employee.prototype, "rejectDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, maxLength: 500 }),
    (0, entity_1.MultiORMColumn)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "employeeLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Employee.prototype, "anonymousBonus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        type: 'numeric',
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], Employee.prototype, "averageIncome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        type: 'numeric',
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], Employee.prototype, "averageBonus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        type: 'numeric',
        default: 0,
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], Employee.prototype, "totalWorkHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)({
        type: 'numeric',
        nullable: true,
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], Employee.prototype, "averageExpenses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Employee.prototype, "show_anonymous_bonus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Employee.prototype, "show_average_bonus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Employee.prototype, "show_average_expenses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Employee.prototype, "show_average_income", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Employee.prototype, "show_billrate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Employee.prototype, "show_payperiod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Employee.prototype, "show_start_work_on", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Employee.prototype, "isJobSearchActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "linkedInUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "facebookUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "instagramUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "twitterUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "githubUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "gitlabUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "upworkUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "stackoverflowUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Employee.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Employee.prototype, "isVetted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)({
        type: 'numeric',
        nullable: true,
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], Employee.prototype, "totalJobs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)({
        type: 'numeric',
        nullable: true,
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], Employee.prototype, "jobSuccess", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, minLength: 3, maxLength: 100 }),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "profile_link", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: false }),
    (0, entity_1.MultiORMColumn)({
        type: Boolean,
        nullable: true,
        default: false
    }),
    __metadata("design:type", Boolean)
], Employee.prototype, "isTrackingEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: false }),
    (0, entity_1.MultiORMColumn)({
        type: Boolean,
        nullable: true,
        default: false
    }),
    __metadata("design:type", Boolean)
], Employee.prototype, "isOnline", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: false }),
    (0, entity_1.MultiORMColumn)({
        type: Boolean,
        nullable: true,
        default: false
    }),
    __metadata("design:type", Boolean)
], Employee.prototype, "isAway", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: false }),
    (0, entity_1.MultiORMColumn)({
        type: Boolean,
        nullable: true,
        default: false
    }),
    __metadata("design:type", Boolean)
], Employee.prototype, "isTrackingTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: true }),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], Employee.prototype, "allowScreenshotCapture", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "upworkId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "linkedInId", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", String)
], Employee.prototype, "fullName", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", Boolean)
], Employee.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.User }),
    (0, entity_1.MultiORMOneToOne)(() => internal_1.User, {
        /** If set to true then it means that related object can be allowed to be inserted or updated in the database. */
        cascade: true,
        /** Database cascade action on delete. */
        onDelete: 'CASCADE',
        /** This column is a boolean flag indicating whether the current entity is the 'owning' side of a relationship.  */
        owner: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Employee.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.user),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], Employee.prototype, "userId", void 0);
__decorate([
    (0, entity_1.MultiORMOneToOne)(() => internal_1.Contact, (contact) => contact.employee, {
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
], Employee.prototype, "contact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.contact),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Employee.prototype, "contactId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Candidate }),
    (0, entity_1.MultiORMOneToOne)(() => internal_1.Candidate, (candidate) => candidate.employee, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** This column is a boolean flag indicating that this is the inverse side of the relationship, and it doesn't control the foreign key directly  */
        owner: false
    }),
    __metadata("design:type", Object)
], Employee.prototype, "candidate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.OrganizationPosition }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationPosition, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Employee.prototype, "organizationPosition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, typeorm_1.RelationId)((it) => it.organizationPosition),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Employee.prototype, "organizationPositionId", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.OrganizationTeamEmployee, (it) => it.employee, {
        cascade: true
    }),
    __metadata("design:type", Array)
], Employee.prototype, "teams", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.TaskEstimation, (it) => it.employee),
    __metadata("design:type", Array)
], Employee.prototype, "estimations", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Timesheet, (it) => it.employee),
    __metadata("design:type", Array)
], Employee.prototype, "timesheets", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.TimeLog, (it) => it.employee),
    __metadata("design:type", Array)
], Employee.prototype, "timeLogs", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.TimeSlot, (it) => it.employee),
    __metadata("design:type", Array)
], Employee.prototype, "timeSlots", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.InvoiceItem, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.InvoiceItem, (it) => it.employee, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Employee.prototype, "invoiceItems", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.RequestApprovalEmployee, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.RequestApprovalEmployee, (it) => it.employee),
    __metadata("design:type", Array)
], Employee.prototype, "requestApprovals", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.EmployeeSetting, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.EmployeeSetting, (it) => it.employee),
    __metadata("design:type", Array)
], Employee.prototype, "settings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.Expense, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Expense, (it) => it.employee),
    __metadata("design:type", Array)
], Employee.prototype, "expenses", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.Goal, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Goal, (it) => it.ownerEmployee, {
        onDelete: 'SET NULL'
    }),
    __metadata("design:type", Array)
], Employee.prototype, "goals", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.Goal, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Goal, (it) => it.lead, {
        onDelete: 'SET NULL'
    }),
    __metadata("design:type", Array)
], Employee.prototype, "leads", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.EmployeeAward, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.EmployeeAward, (it) => it.employee, {
        onDelete: 'SET NULL'
    }),
    __metadata("design:type", Array)
], Employee.prototype, "awards", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.EmployeePhone, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.EmployeePhone, (it) => it.employee),
    __metadata("design:type", Array)
], Employee.prototype, "phoneNumbers", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.DailyPlan, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.DailyPlan, (dailyPlan) => dailyPlan.employee, {
        cascade: true
    }),
    __metadata("design:type", Array)
], Employee.prototype, "dailyPlans", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.OrganizationProject, (it) => it.members, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'organization_project_employee',
        joinColumn: 'employeeId',
        inverseJoinColumn: 'organizationProjectId'
    }),
    (0, typeorm_1.JoinTable)({
        name: 'organization_project_employee'
    }),
    __metadata("design:type", Array)
], Employee.prototype, "projects", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Tag, (tag) => tag.employees, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'tag_employee',
        joinColumn: 'employeeId',
        inverseJoinColumn: 'tagId'
    }),
    (0, typeorm_1.JoinTable)({
        name: 'tag_employee'
    }),
    __metadata("design:type", Array)
], Employee.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Skill }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Skill, (skill) => skill.employees, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Employee.prototype, "skills", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.OrganizationDepartment }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.OrganizationDepartment, (it) => it.members, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Employee.prototype, "organizationDepartments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.OrganizationEmploymentType }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.OrganizationEmploymentType, (it) => it.members, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Employee.prototype, "organizationEmploymentTypes", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.OrganizationContact, (it) => it.members, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Employee.prototype, "organizationContacts", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.TimeOffPolicy, (timeOffPolicy) => timeOffPolicy.employees, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        pivotTable: 'time_off_policy_employee',
        owner: true,
        joinColumn: 'employeeId',
        inverseJoinColumn: 'timeOffPolicyId'
    }),
    (0, typeorm_1.JoinTable)({
        name: 'time_off_policy_employee'
    }),
    __metadata("design:type", Array)
], Employee.prototype, "timeOffPolicies", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.TimeOffRequest, (timeOffRequest) => timeOffRequest.employees, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'time_off_request_employee',
        joinColumn: 'employeeId',
        inverseJoinColumn: 'timeOffRequestId'
    }),
    (0, typeorm_1.JoinTable)({
        name: 'time_off_request_employee'
    }),
    __metadata("design:type", Array)
], Employee.prototype, "timeOffRequests", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Task, (task) => task.members, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Employee.prototype, "tasks", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.EquipmentSharing, (it) => it.employees, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Employee.prototype, "equipmentSharings", void 0);
__decorate([
    (0, entity_1.EmbeddedColumn)({
        mikroOrmEmbeddableEntity: () => employee_1.MikroOrmEmployeeEntityCustomFields,
        typeOrmEmbeddableEntity: () => employee_1.TypeOrmEmployeeEntityCustomFields
    }),
    __metadata("design:type", Object)
], Employee.prototype, "customFields", void 0);
exports.Employee = Employee = __decorate([
    (0, entity_1.MultiORMEntity)('employee', { mikroOrmRepository: () => mikro_orm_employee_repository_1.MikroOrmEmployeeRepository })
], Employee);
//# sourceMappingURL=employee.entity.js.map
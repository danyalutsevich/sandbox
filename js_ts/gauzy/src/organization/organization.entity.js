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
exports.Organization = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const index_1 = require("../../plugins/contracts/dist/index");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_organization_repository_1 = require("./repository/mikro-orm-organization.repository");
let Organization = exports.Organization = class Organization extends internal_1.TenantBaseEntity {
    name;
    isDefault;
    profile_link;
    banner;
    totalEmployees;
    short_description;
    client_focus;
    overview;
    imageUrl;
    currency;
    valueDate;
    defaultValueDateType;
    defaultAlignmentType;
    timeZone;
    regionCode;
    brandColor;
    dateFormat;
    officialName;
    startWeekOn;
    taxId;
    numberFormat;
    minimumProjectSize;
    bonusType;
    bonusPercentage;
    invitesAllowed;
    show_income;
    show_profits;
    show_bonuses_paid;
    show_total_hours;
    show_minimum_project_size;
    show_projects_count;
    show_clients_count;
    show_clients;
    show_employees_count;
    inviteExpiryPeriod;
    fiscalStartDate;
    fiscalEndDate;
    registrationDate;
    futureDateAllowed;
    /**
     * Indicates whether manual time entry is allowed for time tracking.
     *
     * @column
     * @default true
     * @type boolean
     */
    allowManualTime;
    /**
     * Indicates whether modification of time entries is allowed for time tracking.
     *
     * @column
     * @default true
     * @type boolean
     */
    allowModifyTime;
    /**
     * Indicates whether deletion of time entries is allowed for time tracking.
     *
     * @column
     * @default true
     * @type boolean
     */
    allowDeleteTime;
    allowTrackInactivity;
    inactivityTimeLimit;
    activityProofDuration;
    requireReason;
    requireDescription;
    requireProject;
    requireTask;
    requireClient;
    timeFormat;
    separateInvoiceItemTaxAndDiscount;
    website;
    fiscalInformation;
    currencyPosition;
    discountAfterTax;
    defaultStartTime;
    defaultEndTime;
    defaultInvoiceEstimateTerms;
    convertAcceptedEstimates;
    daysUntilDue;
    isRemoveIdleTime;
    allowScreenshotCapture;
    /** Upwork Organization ID */
    upworkOrganizationId;
    /** Upwork Organization Name */
    upworkOrganizationName;
    /**
     * Indicates whether random screenshots are enabled. Defaults to false if not provided.
     */
    randomScreenshot;
    /**
     * Indicates whether tracking is enabled during sleep.
     */
    trackOnSleep;
    /**
     * Specifies the frequency of capturing screenshots. Defaults to 10 if not provided.
     */
    screenshotFrequency;
    /**
     * Indicates whether a certain rule or behavior is enforced. Defaults to false if not provided.
     */
    enforced;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    // Contact
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
    invoices;
    employees;
    deals;
    awards;
    languages;
    featureOrganizations;
    payments;
    organizationSprints;
    invoiceEstimateHistories;
    accountingTemplates;
    reportOrganizations;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    // Tags
    tags;
    skills;
};
__decorate([
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Organization.prototype, "name", void 0);
__decorate([
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], Organization.prototype, "isDefault", void 0);
__decorate([
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "profile_link", void 0);
__decorate([
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "banner", void 0);
__decorate([
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], Organization.prototype, "totalEmployees", void 0);
__decorate([
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "short_description", void 0);
__decorate([
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "client_focus", void 0);
__decorate([
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "overview", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "imageUrl", void 0);
__decorate([
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Organization.prototype, "currency", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Organization.prototype, "valueDate", void 0);
__decorate([
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({
        type: 'simple-enum',
        nullable: true,
        enum: index_1.DefaultValueDateTypeEnum,
        default: index_1.DefaultValueDateTypeEnum.TODAY
    }),
    __metadata("design:type", String)
], Organization.prototype, "defaultValueDateType", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "defaultAlignmentType", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "timeZone", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "regionCode", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "brandColor", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "dateFormat", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "officialName", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "startWeekOn", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "taxId", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "numberFormat", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "minimumProjectSize", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "bonusType", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], Organization.prototype, "bonusPercentage", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true, default: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "invitesAllowed", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "show_income", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "show_profits", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "show_bonuses_paid", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "show_total_hours", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "show_minimum_project_size", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "show_projects_count", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "show_clients_count", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "show_clients", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "show_employees_count", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], Organization.prototype, "inviteExpiryPeriod", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Organization.prototype, "fiscalStartDate", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Organization.prototype, "fiscalEndDate", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Organization.prototype, "registrationDate", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "futureDateAllowed", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "allowManualTime", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "allowModifyTime", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "allowDeleteTime", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "allowTrackInactivity", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ default: 10 }),
    __metadata("design:type", Number)
], Organization.prototype, "inactivityTimeLimit", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ default: 1 }),
    __metadata("design:type", Number)
], Organization.prototype, "activityProofDuration", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], Organization.prototype, "requireReason", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], Organization.prototype, "requireDescription", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], Organization.prototype, "requireProject", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], Organization.prototype, "requireTask", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], Organization.prototype, "requireClient", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ default: 12 }),
    __metadata("design:type", Number)
], Organization.prototype, "timeFormat", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "separateInvoiceItemTaxAndDiscount", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "website", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "fiscalInformation", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ default: index_1.CurrencyPosition.LEFT }),
    __metadata("design:type", String)
], Organization.prototype, "currencyPosition", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "discountAfterTax", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "defaultStartTime", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "defaultEndTime", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "defaultInvoiceEstimateTerms", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "convertAcceptedEstimates", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], Organization.prototype, "daysUntilDue", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], Organization.prototype, "isRemoveIdleTime", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "allowScreenshotCapture", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "upworkOrganizationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "upworkOrganizationName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Organization.prototype, "randomScreenshot", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Organization.prototype, "trackOnSleep", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ type: 'numeric', default: 10 }),
    __metadata("design:type", Number)
], Organization.prototype, "screenshotFrequency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Organization.prototype, "enforced", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Contact, (it) => it.organization, {
        /** Indicates if the relation column value can be nullable or not. */
        nullable: true,
        /** Database cascade action on delete. */
        onDelete: 'SET NULL'
    }),
    __metadata("design:type", Object)
], Organization.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.RelationId)((it) => it.contact),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], Organization.prototype, "contactId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.ImageAsset, {
        /** Indicates if the relation column value can be nullable or not. */
        nullable: true,
        /** Database cascade action on delete. */
        onDelete: 'SET NULL',
        /** Eager relations are always loaded automatically when relation's owner entity is loaded using find* methods. */
        eager: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", internal_1.ImageAsset)
], Organization.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.image),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], Organization.prototype, "imageId", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Invoice, (invoice) => invoice.fromOrganization),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Organization.prototype, "invoices", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Employee, (employee) => employee.organization),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Organization.prototype, "employees", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Deal, (deal) => deal.organization),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Organization.prototype, "deals", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.OrganizationAward, (award) => award.organization),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Organization.prototype, "awards", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.OrganizationLanguage, (language) => language.organization),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Organization.prototype, "languages", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.FeatureOrganization, (featureOrganization) => featureOrganization.organization),
    __metadata("design:type", Array)
], Organization.prototype, "featureOrganizations", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Payment, (payment) => payment.organization, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Organization.prototype, "payments", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.OrganizationSprint, (sprint) => sprint.organization),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Organization.prototype, "organizationSprints", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.InvoiceEstimateHistory, (invoiceEstimateHistory) => invoiceEstimateHistory.organization, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Organization.prototype, "invoiceEstimateHistories", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.AccountingTemplate, (accountingTemplate) => accountingTemplate.organization, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Organization.prototype, "accountingTemplates", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.ReportOrganization, (reportOrganization) => reportOrganization.organization),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Organization.prototype, "reportOrganizations", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Tag, (it) => it.organizations, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'tag_organization',
        joinColumn: 'organizationId',
        inverseJoinColumn: 'tagId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'tag_organization'
    }),
    __metadata("design:type", Array)
], Organization.prototype, "tags", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Skill, (skill) => skill.organizations, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Organization.prototype, "skills", void 0);
exports.Organization = Organization = __decorate([
    (0, entity_1.MultiORMEntity)('organization', { mikroOrmRepository: () => mikro_orm_organization_repository_1.MikroOrmOrganizationRepository })
], Organization);
//# sourceMappingURL=organization.entity.js.map
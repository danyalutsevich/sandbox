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
exports.Candidate = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const index_1 = require("../../plugins/contracts/dist/index");
const internal_1 = require("../core/entities/internal");
const pipes_1 = require("./../shared/pipes");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_candidate_repository_1 = require("./repository/mikro-orm-candidate.repository");
let Candidate = exports.Candidate = class Candidate extends internal_1.TenantOrganizationBaseEntity {
    rating;
    valueDate;
    appliedDate;
    hiredDate;
    status;
    rejectDate;
    candidateLevel;
    reWeeklyLimit; // Recurring Weekly Limit (hours)
    billRateCurrency;
    billRateValue;
    minimumBillingRate;
    payPeriod;
    cvUrl;
    /** Additional virtual columns */
    ratings;
    alreadyHired;
    /*
    |--------------------------------------------------------------------------
    | @OneToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Contact
     */
    contact;
    contactId;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    organizationPosition;
    organizationPositionId;
    /*
    |--------------------------------------------------------------------------
    | @OneToOne
    |--------------------------------------------------------------------------
    */
    source;
    sourceId;
    /**
     * User
     */
    user;
    userId;
    /**
     * Employee
     */
    employee;
    employeeId;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    /**
     * Represents a one-to-many relationship between the Candidate and CandidateEducation entities.
     * Each candidate can have multiple educations associated with them.
     * When a candidate is deleted, the related education entries are set to NULL.
     */
    educations;
    /**
     * Represents a one-to-many relationship between the Candidate and CandidateInterview entities.
     * Each candidate can have multiple interviews associated with them.
     * When a candidate is deleted, the related interview entries are set to NULL.
     */
    interview;
    /**
     * Represents a one-to-many relationship between the Candidate and CandidateExperience entities.
     * Each candidate can have multiple experiences associated with them.
     * When a candidate is deleted, the related experience entries are set to NULL.
     */
    experience;
    /**
     * Represents a one-to-many relationship between the Candidate and CandidateSkill entities.
     * Each candidate can have multiple skills associated with them.
     * When a candidate is deleted, the related skill entries are set to NULL.
     */
    skills;
    /**
     * Represents a one-to-many relationship between the Candidate and CandidateDocument entities.
     * Each candidate can have multiple documents associated with them.
     * When a candidate is deleted, the related document entries are set to NULL.
     */
    documents;
    /**
     * Represents a one-to-many relationship between the Candidate and CandidateFeedback entities.
     * Each candidate can have multiple feedbacks associated with them.
     * When a candidate is deleted, the related feedback entries are set to NULL.
     */
    feedbacks;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    tags;
    /**
     * Organization Departments
     */
    organizationDepartments;
    /**
     * Organization Employment Types
     */
    organizationEmploymentTypes;
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        type: 'numeric',
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], Candidate.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Candidate.prototype, "valueDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Candidate.prototype, "appliedDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Candidate.prototype, "hiredDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.CandidateStatusEnum }),
    (0, entity_1.MultiORMColumn)({ nullable: true, default: index_1.CandidateStatusEnum.APPLIED }),
    __metadata("design:type", String)
], Candidate.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Candidate.prototype, "rejectDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, maxLength: 500 }),
    (0, entity_1.MultiORMColumn)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Candidate.prototype, "candidateLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], Candidate.prototype, "reWeeklyLimit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, maxLength: 255 }),
    (0, entity_1.MultiORMColumn)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Candidate.prototype, "billRateCurrency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], Candidate.prototype, "billRateValue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], Candidate.prototype, "minimumBillingRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.PayPeriodEnum }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Candidate.prototype, "payPeriod", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Candidate.prototype, "cvUrl", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", Number)
], Candidate.prototype, "ratings", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", Boolean)
], Candidate.prototype, "alreadyHired", void 0);
__decorate([
    (0, entity_1.MultiORMOneToOne)(() => internal_1.Contact, (contact) => contact.candidate, {
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
], Candidate.prototype, "contact", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.RelationId)((it) => it.contact),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Candidate.prototype, "contactId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationPosition, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Candidate.prototype, "organizationPosition", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.RelationId)((it) => it.organizationPosition),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Candidate.prototype, "organizationPositionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.CandidateSource }),
    (0, entity_1.MultiORMOneToOne)(() => internal_1.CandidateSource, (candidateSource) => candidateSource.candidate, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** If set to true then it means that related object can be allowed to be inserted or updated in the database. */
        cascade: true,
        /** Database cascade action on delete. */
        onDelete: 'CASCADE',
        /** This column is a boolean flag indicating whether the current entity is the 'owning' side of a relationship.  */
        owner: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Candidate.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.source),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Candidate.prototype, "sourceId", void 0);
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
], Candidate.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.user),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], Candidate.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Employee }),
    (0, entity_1.MultiORMOneToOne)(() => internal_1.Employee, (employee) => employee.candidate, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** This column is a boolean flag indicating whether the current entity is the 'owning' side of a relationship.  */
        owner: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Candidate.prototype, "employee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.employee),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Candidate.prototype, "employeeId", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.CandidateEducation, (education) => education.candidate, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Candidate.prototype, "educations", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.CandidateInterview, (interview) => interview.candidate, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Candidate.prototype, "interview", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.CandidateExperience, (experience) => experience.candidate, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Candidate.prototype, "experience", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.CandidateSkill, (skill) => skill.candidate, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Candidate.prototype, "skills", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.CandidateDocument, (document) => document.candidate, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Candidate.prototype, "documents", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.CandidateFeedback, (feedback) => feedback.candidate, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Candidate.prototype, "feedbacks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Tag, isArray: true }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Tag, (tag) => tag.candidates, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        pivotTable: 'tag_candidate',
        owner: true,
        joinColumn: 'candidateId',
        inverseJoinColumn: 'tagId'
    }),
    (0, typeorm_1.JoinTable)({
        name: 'tag_candidate'
    }),
    __metadata("design:type", Array)
], Candidate.prototype, "tags", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.OrganizationDepartment, (department) => department.candidates, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Candidate.prototype, "organizationDepartments", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.OrganizationEmploymentType, (employmentType) => employmentType.candidates),
    __metadata("design:type", Array)
], Candidate.prototype, "organizationEmploymentTypes", void 0);
exports.Candidate = Candidate = __decorate([
    (0, entity_1.MultiORMEntity)('candidate', { mikroOrmRepository: () => mikro_orm_candidate_repository_1.MikroOrmCandidateRepository })
], Candidate);
//# sourceMappingURL=candidate.entity.js.map
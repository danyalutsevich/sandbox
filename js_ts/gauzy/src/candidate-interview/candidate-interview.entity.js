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
exports.CandidateInterview = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const internal_1 = require("../core/entities/internal");
const pipes_1 = require("./../shared/pipes");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_candidate_interview_repository_1 = require("./repository/mikro-orm-candidate-interview.repository");
let CandidateInterview = exports.CandidateInterview = class CandidateInterview extends internal_1.TenantOrganizationBaseEntity {
    title;
    startTime;
    endTime;
    location;
    note;
    rating;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    feedbacks;
    technologies;
    personalQualities;
    interviewers;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Candidate
     */
    candidate;
    candidateId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], CandidateInterview.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], CandidateInterview.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], CandidateInterview.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], CandidateInterview.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], CandidateInterview.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        type: 'numeric',
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], CandidateInterview.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.CandidateFeedback }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.CandidateFeedback, (feedback) => feedback.interview, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], CandidateInterview.prototype, "feedbacks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.CandidateTechnologies }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.CandidateTechnologies, (technologies) => technologies.interview, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], CandidateInterview.prototype, "technologies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.CandidatePersonalQualities }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.CandidatePersonalQualities, (personalQualities) => personalQualities.interview, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], CandidateInterview.prototype, "personalQualities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.CandidateInterviewers }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.CandidateInterviewers, (interviewers) => interviewers.interview, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], CandidateInterview.prototype, "interviewers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Candidate }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Candidate, (candidate) => candidate.interview, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], CandidateInterview.prototype, "candidate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.candidate),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], CandidateInterview.prototype, "candidateId", void 0);
exports.CandidateInterview = CandidateInterview = __decorate([
    (0, entity_1.MultiORMEntity)('candidate_interview', { mikroOrmRepository: () => mikro_orm_candidate_interview_repository_1.MikroOrmCandidateInterviewRepository })
], CandidateInterview);
//# sourceMappingURL=candidate-interview.entity.js.map
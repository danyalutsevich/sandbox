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
exports.CandidateFeedback = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const pipes_1 = require("./../shared/pipes");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_candidate_feedback_repository_1 = require("./repository/mikro-orm-candidate-feedback.repository");
let CandidateFeedback = exports.CandidateFeedback = class CandidateFeedback extends internal_1.TenantOrganizationBaseEntity {
    description;
    rating;
    status;
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
    /**
     * Candidate Interview
     */
    interview;
    interviewId;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    /**
     * Candidate Criterions Rating
     */
    criterionsRating;
    /*
    |--------------------------------------------------------------------------
    | @OneToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Candidate Interviewers
     */
    interviewer;
    interviewerId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], CandidateFeedback.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        type: 'numeric',
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], CandidateFeedback.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.CandidateStatusEnum }),
    (0, entity_1.MultiORMColumn)({
        type: 'simple-enum',
        nullable: true,
        enum: index_1.CandidateStatusEnum
    }),
    __metadata("design:type", String)
], CandidateFeedback.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Candidate }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Candidate, (candidate) => candidate.feedbacks, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], CandidateFeedback.prototype, "candidate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.candidate),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], CandidateFeedback.prototype, "candidateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.CandidateInterview }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.CandidateInterview, (candidateInterview) => candidateInterview.feedbacks, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], CandidateFeedback.prototype, "interview", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.interview),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], CandidateFeedback.prototype, "interviewId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.CandidateCriterionsRating }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.CandidateCriterionsRating, (criterionsRating) => criterionsRating.feedback, {
        cascade: true
    }),
    __metadata("design:type", Array)
], CandidateFeedback.prototype, "criterionsRating", void 0);
__decorate([
    (0, entity_1.MultiORMOneToOne)(() => internal_1.CandidateInterviewers, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** This column is a boolean flag indicating whether the current entity is the 'owning' side of a relationship.  */
        owner: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], CandidateFeedback.prototype, "interviewer", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.interviewer),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], CandidateFeedback.prototype, "interviewerId", void 0);
exports.CandidateFeedback = CandidateFeedback = __decorate([
    (0, entity_1.MultiORMEntity)('candidate_feedback', { mikroOrmRepository: () => mikro_orm_candidate_feedback_repository_1.MikroOrmCandidateFeedbackRepository })
], CandidateFeedback);
//# sourceMappingURL=candidate-feedbacks.entity.js.map
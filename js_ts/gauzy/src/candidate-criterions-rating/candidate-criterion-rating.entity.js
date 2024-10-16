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
exports.CandidateCriterionsRating = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_candidate_criterions_rating_repository_1 = require("./repository/mikro-orm-candidate-criterions-rating.repository");
let CandidateCriterionsRating = exports.CandidateCriterionsRating = class CandidateCriterionsRating extends internal_1.TenantOrganizationBaseEntity {
    rating;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Candidate Technologies
     */
    technology;
    technologyId;
    /**
     * Candidate Personal Qualities
     */
    personalQuality;
    personalQualityId;
    /**
     * Candidate Feedback
     */
    feedback;
    feedbackId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Number)
], CandidateCriterionsRating.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.CandidateTechnologies }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.CandidateTechnologies, (quality) => quality.criterionsRatings, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], CandidateCriterionsRating.prototype, "technology", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.technology),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], CandidateCriterionsRating.prototype, "technologyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.CandidatePersonalQualities }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.CandidatePersonalQualities, (quality) => quality.criterionsRatings, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], CandidateCriterionsRating.prototype, "personalQuality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.personalQuality),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], CandidateCriterionsRating.prototype, "personalQualityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.CandidateFeedback }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.CandidateFeedback, (feedback) => feedback.criterionsRating, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], CandidateCriterionsRating.prototype, "feedback", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.feedback),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], CandidateCriterionsRating.prototype, "feedbackId", void 0);
exports.CandidateCriterionsRating = CandidateCriterionsRating = __decorate([
    (0, entity_1.MultiORMEntity)('candidate_criterion_rating', { mikroOrmRepository: () => mikro_orm_candidate_criterions_rating_repository_1.MikroOrmCandidateCriterionsRatingRepository })
], CandidateCriterionsRating);
//# sourceMappingURL=candidate-criterion-rating.entity.js.map
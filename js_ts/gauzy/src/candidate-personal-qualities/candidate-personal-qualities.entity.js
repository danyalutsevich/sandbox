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
exports.CandidatePersonalQualities = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const internal_1 = require("../core/entities/internal");
const class_validator_1 = require("class-validator");
const pipes_1 = require("./../shared/pipes");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_candidate_personal_qualities_repository_1 = require("./repository/mikro-orm-candidate-personal-qualities.repository");
let CandidatePersonalQualities = exports.CandidatePersonalQualities = class CandidatePersonalQualities extends internal_1.TenantOrganizationBaseEntity {
    name;
    rating;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    interview;
    interviewId;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    criterionsRatings;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], CandidatePersonalQualities.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        type: 'numeric',
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], CandidatePersonalQualities.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.CandidateInterview }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.CandidateInterview, (interview) => interview.personalQualities, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], CandidatePersonalQualities.prototype, "interview", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.interview),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], CandidatePersonalQualities.prototype, "interviewId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.CandidateCriterionsRating }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.CandidateCriterionsRating, (criterionsRating) => criterionsRating.personalQuality, {
        cascade: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], CandidatePersonalQualities.prototype, "criterionsRatings", void 0);
exports.CandidatePersonalQualities = CandidatePersonalQualities = __decorate([
    (0, entity_1.MultiORMEntity)('candidate_personal_quality', { mikroOrmRepository: () => mikro_orm_candidate_personal_qualities_repository_1.MikroOrmCandidatePersonalQualitiesRepository })
], CandidatePersonalQualities);
//# sourceMappingURL=candidate-personal-qualities.entity.js.map
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
exports.CandidateEducation = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_candidate_education_repository_1 = require("./repository/mikro-orm-candidate-education.repository");
let CandidateEducation = exports.CandidateEducation = class CandidateEducation extends internal_1.TenantOrganizationBaseEntity {
    schoolName;
    degree;
    field;
    completionDate;
    notes;
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
], CandidateEducation.prototype, "schoolName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], CandidateEducation.prototype, "degree", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], CandidateEducation.prototype, "field", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Date)
], CandidateEducation.prototype, "completionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], CandidateEducation.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Candidate }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Candidate, (candidate) => candidate.educations, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], CandidateEducation.prototype, "candidate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.candidate),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], CandidateEducation.prototype, "candidateId", void 0);
exports.CandidateEducation = CandidateEducation = __decorate([
    (0, entity_1.MultiORMEntity)('candidate_education', { mikroOrmRepository: () => mikro_orm_candidate_education_repository_1.MikroOrmCandidateEducationRepository })
], CandidateEducation);
//# sourceMappingURL=candidate-education.entity.js.map
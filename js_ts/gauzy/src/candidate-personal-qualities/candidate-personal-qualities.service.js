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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidatePersonalQualitiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crud_1 = require("./../core/crud");
const type_orm_candidate_personal_qualities_repository_1 = require("./repository/type-orm-candidate-personal-qualities.repository");
const mikro_orm_candidate_personal_qualities_repository_1 = require("./repository/mikro-orm-candidate-personal-qualities.repository");
const candidate_personal_qualities_entity_1 = require("./candidate-personal-qualities.entity");
let CandidatePersonalQualitiesService = exports.CandidatePersonalQualitiesService = class CandidatePersonalQualitiesService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmCandidatePersonalQualitiesRepository, mikroOrmCandidatePersonalQualitiesRepository) {
        super(typeOrmCandidatePersonalQualitiesRepository, mikroOrmCandidatePersonalQualitiesRepository);
    }
    /**
     *
     * @param createInput
     * @returns
     */
    async createBulk(createInput) {
        return await this.typeOrmRepository.save(createInput);
    }
    /**
     *
     * @param interviewId
     * @returns
     */
    async getPersonalQualitiesByInterviewId(interviewId) {
        return await this.typeOrmRepository
            .createQueryBuilder('candidate_personal_quality')
            .where('candidate_personal_quality.interviewId = :interviewId', {
            interviewId
        })
            .getMany();
    }
    /**
     *
     * @param ids
     * @returns
     */
    async deleteBulk(ids) {
        return await this.typeOrmRepository.delete(ids);
    }
};
exports.CandidatePersonalQualitiesService = CandidatePersonalQualitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(candidate_personal_qualities_entity_1.CandidatePersonalQualities)),
    __metadata("design:paramtypes", [type_orm_candidate_personal_qualities_repository_1.TypeOrmCandidatePersonalQualitiesRepository,
        mikro_orm_candidate_personal_qualities_repository_1.MikroOrmCandidatePersonalQualitiesRepository])
], CandidatePersonalQualitiesService);
//# sourceMappingURL=candidate-personal-qualities.service.js.map
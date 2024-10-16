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
exports.CandidateCriterionsRatingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crud_1 = require("./../core/crud");
const candidate_criterion_rating_entity_1 = require("./candidate-criterion-rating.entity");
const type_orm_candidate_criterions_rating_repository_1 = require("./repository/type-orm-candidate-criterions-rating.repository");
const mikro_orm_candidate_criterions_rating_repository_1 = require("./repository/mikro-orm-candidate-criterions-rating.repository");
let CandidateCriterionsRatingService = exports.CandidateCriterionsRatingService = class CandidateCriterionsRatingService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmCandidateCriterionsRatingRepository, mikroOrmCandidateCriterionsRatingRepository) {
        super(typeOrmCandidateCriterionsRatingRepository, mikroOrmCandidateCriterionsRatingRepository);
    }
    /**
     *
     * @param technologyCreateInput
     * @param qualityCreateInput
     * @returns
     */
    async createBulk(technologyCreateInput, qualityCreateInput) {
        return [await this.typeOrmRepository.save(technologyCreateInput), await this.typeOrmRepository.save(qualityCreateInput)];
    }
    /***
     *
     */
    async getCriterionsByFeedbackId(feedbackId) {
        return await this.typeOrmRepository
            .createQueryBuilder('candidate_feedback')
            .where('candidate_feedback.feedbackId = :feedbackId', {
            feedbackId
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
    /**
     *
     * @param tech
     * @param qual
     * @returns
     */
    async updateBulk(tech, qual) {
        return [await this.typeOrmRepository.save(tech), await this.typeOrmRepository.save(qual)];
    }
};
exports.CandidateCriterionsRatingService = CandidateCriterionsRatingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(candidate_criterion_rating_entity_1.CandidateCriterionsRating)),
    __metadata("design:paramtypes", [type_orm_candidate_criterions_rating_repository_1.TypeOrmCandidateCriterionsRatingRepository,
        mikro_orm_candidate_criterions_rating_repository_1.MikroOrmCandidateCriterionsRatingRepository])
], CandidateCriterionsRatingService);
//# sourceMappingURL=candidate-criterion-rating.service.js.map
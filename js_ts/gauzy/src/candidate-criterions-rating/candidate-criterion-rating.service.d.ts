import { ICandidateCriterionsRating, ICandidateCriterionsRatingCreateInput } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { CandidateCriterionsRating } from './candidate-criterion-rating.entity';
import { TypeOrmCandidateCriterionsRatingRepository } from './repository/type-orm-candidate-criterions-rating.repository';
import { MikroOrmCandidateCriterionsRatingRepository } from './repository/mikro-orm-candidate-criterions-rating.repository';
export declare class CandidateCriterionsRatingService extends TenantAwareCrudService<CandidateCriterionsRating> {
    constructor(typeOrmCandidateCriterionsRatingRepository: TypeOrmCandidateCriterionsRatingRepository, mikroOrmCandidateCriterionsRatingRepository: MikroOrmCandidateCriterionsRatingRepository);
    /**
     *
     * @param technologyCreateInput
     * @param qualityCreateInput
     * @returns
     */
    createBulk(technologyCreateInput: ICandidateCriterionsRatingCreateInput[], qualityCreateInput: ICandidateCriterionsRatingCreateInput[]): Promise<(ICandidateCriterionsRatingCreateInput & CandidateCriterionsRating)[][]>;
    /***
     *
     */
    getCriterionsByFeedbackId(feedbackId: string): Promise<CandidateCriterionsRating[]>;
    /**
     *
     * @param ids
     * @returns
     */
    deleteBulk(ids: string[]): Promise<import("typeorm").DeleteResult>;
    /**
     *
     * @param tech
     * @param qual
     * @returns
     */
    updateBulk(tech: ICandidateCriterionsRating[], qual: ICandidateCriterionsRating[]): Promise<(ICandidateCriterionsRating & CandidateCriterionsRating)[][]>;
}

import { CommandBus } from '@nestjs/cqrs';
import { ICandidateCriterionsRating, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController, PaginationParams } from './../core/crud';
import { CandidateCriterionsRatingService } from './candidate-criterion-rating.service';
import { CandidateCriterionsRating } from './candidate-criterion-rating.entity';
export declare class CandidateCriterionsRatingController extends CrudController<CandidateCriterionsRating> {
    private readonly candidateCriterionsRatingService;
    private readonly commandBus;
    constructor(candidateCriterionsRatingService: CandidateCriterionsRatingService, commandBus: CommandBus);
    /**
     * CREATE bulk candidate criterions rating
     *
     * @param body
     * @returns
     */
    createBulk(body: any): Promise<ICandidateCriterionsRating[]>;
    /**
     * UPDATE bulk candidate criterions rating
     *
     * @param body
     * @returns
     */
    updateBulk(body: {
        criterionsRating: ICandidateCriterionsRating[];
        technologies: number[];
        personalQualities: number[];
    }): Promise<ICandidateCriterionsRating[]>;
    /**
     * GET candidate criterions rating
     *
     * @param params
     * @returns
     */
    findAll(params: PaginationParams<CandidateCriterionsRating>): Promise<IPagination<ICandidateCriterionsRating>>;
    /**
     * DELETE candidate criterions rating by feedback id
     *
     * @param feedbackId
     * @returns
     */
    deleteBulkByFeedbackId(feedbackId: string): Promise<any>;
}

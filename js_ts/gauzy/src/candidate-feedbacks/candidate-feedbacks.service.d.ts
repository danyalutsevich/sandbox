import { ICandidateFeedback, ICandidateInterview } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { CandidateFeedback } from './candidate-feedbacks.entity';
import { MikroOrmCandidateFeedbackRepository } from './repository/mikro-orm-candidate-feedback.repository';
import { TypeOrmCandidateFeedbackRepository } from './repository/type-orm-candidate-feedback.repository';
export declare class CandidateFeedbacksService extends TenantAwareCrudService<CandidateFeedback> {
    constructor(typeOrmCandidateFeedbackRepository: TypeOrmCandidateFeedbackRepository, mikroOrmCandidateFeedbackRepository: MikroOrmCandidateFeedbackRepository);
    /**
     *
     * @param interviewId
     * @returns
     */
    getFeedbacksByInterviewId(interviewId: ICandidateInterview['id']): Promise<ICandidateFeedback[]>;
    /**
     *
     * @param feedbacks
     * @returns
     */
    calcRating(feedbacks: ICandidateFeedback[]): number;
}

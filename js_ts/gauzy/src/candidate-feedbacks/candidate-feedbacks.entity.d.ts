import { ICandidateFeedback, CandidateStatusEnum, ICandidateInterviewers, ICandidateCriterionsRating, ICandidate, ICandidateInterview } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class CandidateFeedback extends TenantOrganizationBaseEntity implements ICandidateFeedback {
    description: string;
    rating: number;
    status?: CandidateStatusEnum;
    /**
     * Candidate
     */
    candidate?: ICandidate;
    candidateId?: ICandidate['id'];
    /**
     * Candidate Interview
     */
    interview?: ICandidateInterview;
    interviewId?: ICandidateInterview['id'];
    /**
     * Candidate Criterions Rating
     */
    criterionsRating?: ICandidateCriterionsRating[];
    /**
     * Candidate Interviewers
     */
    interviewer?: ICandidateInterviewers;
    interviewerId?: ICandidateInterviewers['id'];
}

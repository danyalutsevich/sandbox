import { ICandidateInterview, ICandidateFeedback, ICandidateInterviewers, ICandidateTechnologies, ICandidatePersonalQualities, ICandidate } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class CandidateInterview extends TenantOrganizationBaseEntity implements ICandidateInterview {
    title: string;
    startTime: Date;
    endTime: Date;
    location?: string;
    note?: string;
    rating?: number;
    feedbacks?: ICandidateFeedback[];
    technologies?: ICandidateTechnologies[];
    personalQualities?: ICandidatePersonalQualities[];
    interviewers?: ICandidateInterviewers[];
    /**
     * Candidate
     */
    candidate?: ICandidate;
    candidateId?: ICandidate['id'];
}

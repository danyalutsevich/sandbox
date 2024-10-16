import { ICandidatePersonalQualities, ICandidateInterview, ICandidateCriterionsRating } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class CandidatePersonalQualities extends TenantOrganizationBaseEntity implements ICandidatePersonalQualities {
    name: string;
    rating?: number;
    interview?: ICandidateInterview;
    interviewId?: string;
    criterionsRatings?: ICandidateCriterionsRating[];
}

import { ICandidateTechnologies, ICandidateInterview, ICandidateCriterionsRating } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class CandidateTechnologies extends TenantOrganizationBaseEntity implements ICandidateTechnologies {
    name: string;
    rating?: number;
    interview?: ICandidateInterview;
    interviewId?: string;
    criterionsRatings?: ICandidateCriterionsRating[];
}

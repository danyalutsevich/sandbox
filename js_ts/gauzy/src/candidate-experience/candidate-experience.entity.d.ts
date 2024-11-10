import { TenantOrganizationBaseEntity } from '../core/entities/internal';
import { ICandidate, ICandidateExperience, ID } from '../../plugins/contracts/dist';
export declare class CandidateExperience extends TenantOrganizationBaseEntity implements ICandidateExperience {
    occupation: string;
    duration: string;
    description?: string;
    candidate?: ICandidate;
    candidateId?: ID;
}

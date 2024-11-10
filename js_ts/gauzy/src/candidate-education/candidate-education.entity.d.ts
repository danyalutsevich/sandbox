import { ICandidateEducation, ICandidate } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class CandidateEducation extends TenantOrganizationBaseEntity implements ICandidateEducation {
    schoolName: string;
    degree: string;
    field: string;
    completionDate: Date;
    notes?: string;
    /**
     * Candidate
     */
    candidate?: ICandidate;
    candidateId?: string;
}

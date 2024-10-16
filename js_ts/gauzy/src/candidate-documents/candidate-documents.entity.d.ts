import { ICandidateDocument, ICandidate } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class CandidateDocument extends TenantOrganizationBaseEntity implements ICandidateDocument {
    name: string;
    documentUrl: string;
    candidate?: ICandidate;
    candidateId?: string;
}

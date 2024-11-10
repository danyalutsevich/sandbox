import { ICandidate, ICandidateSource } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class CandidateSource extends TenantOrganizationBaseEntity implements ICandidateSource {
    name: string;
    candidate?: ICandidate;
}

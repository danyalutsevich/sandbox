import { ICandidateSourceUpdateInput } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "./../../core/dto";
export declare class UpdateCandidateSourceDTO extends TenantOrganizationBaseDTO implements ICandidateSourceUpdateInput {
    readonly name: string;
}

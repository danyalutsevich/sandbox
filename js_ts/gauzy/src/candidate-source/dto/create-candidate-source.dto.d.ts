import { ICandidateSourceCreateInput } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "./../../core/dto";
export declare class CreateCandidateSourceDTO extends TenantOrganizationBaseDTO implements ICandidateSourceCreateInput {
    readonly name: string;
}

import { ICandidateSkillUpdateInput } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "./../../core/dto";
export declare class UpdateCandidateSkillDTO extends TenantOrganizationBaseDTO implements ICandidateSkillUpdateInput {
    readonly name: string;
}

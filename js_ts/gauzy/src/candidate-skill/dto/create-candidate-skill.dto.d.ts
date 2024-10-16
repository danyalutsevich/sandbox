import { ICandidateSkillCreateInput } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "./../../core/dto";
import { CandidateFeatureDTO } from "./../../candidate/dto";
declare const CreateCandidateSkillDTO_base: import("@nestjs/mapped-types").MappedType<TenantOrganizationBaseDTO & CandidateFeatureDTO>;
export declare class CreateCandidateSkillDTO extends CreateCandidateSkillDTO_base implements ICandidateSkillCreateInput {
    readonly name: string;
}
export {};

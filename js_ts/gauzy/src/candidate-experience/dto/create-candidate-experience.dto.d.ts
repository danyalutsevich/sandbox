import { TenantOrganizationBaseDTO } from "./../../core/dto";
import { CandidateFeatureDTO } from "./../../candidate/dto";
declare const CreateCandidateExperienceDTO_base: import("@nestjs/mapped-types").MappedType<TenantOrganizationBaseDTO & CandidateFeatureDTO>;
/**
 * CREATE candidate experience DTO request validation
 *
 */
export declare class CreateCandidateExperienceDTO extends CreateCandidateExperienceDTO_base {
    readonly occupation: string;
    readonly duration: string;
    readonly description: string;
}
export {};

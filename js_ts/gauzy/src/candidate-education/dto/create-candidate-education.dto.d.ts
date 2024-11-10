import { TenantOrganizationBaseDTO } from "./../../core/dto";
import { CandidateFeatureDTO } from "./../../candidate/dto";
declare const CreateCandidateEducationDTO_base: import("@nestjs/mapped-types").MappedType<TenantOrganizationBaseDTO & CandidateFeatureDTO>;
export declare class CreateCandidateEducationDTO extends CreateCandidateEducationDTO_base {
    readonly schoolName: string;
    readonly degree: string;
    readonly field: string;
    readonly completionDate: Date;
    readonly notes: string;
}
export {};

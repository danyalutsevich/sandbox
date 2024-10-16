import { CreateCandidateExperienceDTO } from "./create-candidate-experience.dto";
declare const UpdateCandidateExperienceDTO_base: import("@nestjs/mapped-types").MappedType<Omit<CreateCandidateExperienceDTO, "candidate" | "candidateId">>;
/**
 * UPDATE candidate experience DTO request validation
 *
 */
export declare class UpdateCandidateExperienceDTO extends UpdateCandidateExperienceDTO_base {
}
export {};

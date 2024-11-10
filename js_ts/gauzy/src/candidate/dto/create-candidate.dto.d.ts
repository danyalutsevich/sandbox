import { ICandidateCreateInput, ICandidateDocument } from '../../../plugins/contracts';
import { RelationalTagDTO } from "./../../tags/dto";
import { EmploymentDTO, UserInputDTO } from "./../../employee/dto";
declare const CreateCandidateDTO_base: import("@nestjs/common").Type<RelationalTagDTO & EmploymentDTO>;
/**
 * Candidate Create DTO
 *
 */
export declare class CreateCandidateDTO extends CreateCandidateDTO_base implements ICandidateCreateInput {
    readonly user: UserInputDTO;
    readonly password: string;
    readonly documents: ICandidateDocument[];
}
export {};

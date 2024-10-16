import { ICandidateUpdateInput } from '../../../plugins/contracts';
import { UpdateProfileDTO } from "./../../employee/dto";
export declare class UpdateCandidateDTO extends UpdateProfileDTO implements ICandidateUpdateInput {
    readonly appliedDate?: Date;
    readonly hiredDate?: Date;
    readonly cvUrl?: string;
    readonly candidateLevel?: string;
}

import { ICommand } from '@nestjs/cqrs';
import { ICandidateInterviewersDeleteInput } from '../../../plugins/contracts';
export declare class CandidateInterviewersEmployeeBulkDeleteCommand implements ICommand {
    readonly deleteInput: ICandidateInterviewersDeleteInput[];
    static readonly type = "[CandidateInterviewers] Delete";
    constructor(deleteInput: ICandidateInterviewersDeleteInput[]);
}

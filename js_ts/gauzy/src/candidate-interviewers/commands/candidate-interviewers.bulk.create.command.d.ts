import { ICandidateInterviewersCreateInput } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class CandidateInterviewersBulkCreateCommand implements ICommand {
    readonly input: ICandidateInterviewersCreateInput;
    static readonly type = "[CandidateInterviewers] Register";
    constructor(input: ICandidateInterviewersCreateInput);
}

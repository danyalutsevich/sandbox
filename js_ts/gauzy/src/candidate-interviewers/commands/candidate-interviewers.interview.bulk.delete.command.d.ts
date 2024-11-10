import { ICommand } from '@nestjs/cqrs';
export declare class CandidateInterviewersInterviewBulkDeleteCommand implements ICommand {
    readonly id: string;
    static readonly type = "[CandidateInterviewers] Delete";
    constructor(id: string);
}

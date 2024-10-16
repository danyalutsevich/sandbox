import { ICommandHandler } from '@nestjs/cqrs';
import { CandidateInterviewersService } from '../../candidate-interviewers.service';
import { CandidateInterviewersInterviewBulkDeleteCommand } from '../candidate-interviewers.interview.bulk.delete.command';
export declare class CandidateInterviewersInterviewBulkDeleteHandler implements ICommandHandler<CandidateInterviewersInterviewBulkDeleteCommand> {
    private readonly candidateInterviewersService;
    constructor(candidateInterviewersService: CandidateInterviewersService);
    execute(command: CandidateInterviewersInterviewBulkDeleteCommand): Promise<any>;
}

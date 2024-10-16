import { ICommandHandler } from '@nestjs/cqrs';
import { ICandidateInterviewers } from '../../../../plugins/contracts/dist/index';
import { CandidateInterviewersBulkCreateCommand } from '../candidate-interviewers.bulk.create.command';
import { CandidateInterviewersService } from '../../candidate-interviewers.service';
export declare class CandidateInterviewersBulkCreateHandler implements ICommandHandler<CandidateInterviewersBulkCreateCommand> {
    private readonly candidateInterviewersService;
    constructor(candidateInterviewersService: CandidateInterviewersService);
    execute(command: CandidateInterviewersBulkCreateCommand): Promise<ICandidateInterviewers[]>;
}

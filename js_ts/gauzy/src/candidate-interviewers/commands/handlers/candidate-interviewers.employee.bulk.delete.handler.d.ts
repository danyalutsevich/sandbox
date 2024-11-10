import { ICommandHandler } from '@nestjs/cqrs';
import { CandidateInterviewersEmployeeBulkDeleteCommand } from '../candidate-interviewers.employee.bulk.delete.command';
import { CandidateInterviewersService } from '../../candidate-interviewers.service';
export declare class CandidateInterviewersEmployeeBulkDeleteHandler implements ICommandHandler<CandidateInterviewersEmployeeBulkDeleteCommand> {
    private readonly candidateInterviewersService;
    constructor(candidateInterviewersService: CandidateInterviewersService);
    execute(command: CandidateInterviewersEmployeeBulkDeleteCommand): Promise<any>;
}

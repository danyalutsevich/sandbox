import { ICommandHandler } from '@nestjs/cqrs';
import { FeedbackDeleteCommand } from '../candidate-feedbacks.delete.command';
import { CandidateFeedbacksService } from '../../candidate-feedbacks.service';
import { CandidateInterviewService } from '../../../candidate-interview/candidate-interview.service';
export declare class FeedbackDeleteHandler implements ICommandHandler<FeedbackDeleteCommand> {
    private readonly candidateFeedbackService;
    private readonly candidateInterviewService;
    constructor(candidateFeedbackService: CandidateFeedbacksService, candidateInterviewService: CandidateInterviewService);
    execute(command: FeedbackDeleteCommand): Promise<any>;
    delete(id: string): Promise<any>;
}

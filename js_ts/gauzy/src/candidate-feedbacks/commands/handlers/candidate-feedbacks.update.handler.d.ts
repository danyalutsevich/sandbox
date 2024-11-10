import { ICommandHandler } from '@nestjs/cqrs';
import { ICandidateFeedback, ICandidateFeedbackCreateInput } from '../../../../plugins/contracts';
import { FeedbackUpdateCommand } from '../candidate-feedbacks.update.command';
import { CandidateFeedbacksService } from '../../candidate-feedbacks.service';
import { CandidateInterviewService } from '../../../candidate-interview/candidate-interview.service';
export declare class FeedbackUpdateHandler implements ICommandHandler<FeedbackUpdateCommand> {
    private readonly candidateFeedbackService;
    private readonly candidateInterviewService;
    constructor(candidateFeedbackService: CandidateFeedbacksService, candidateInterviewService: CandidateInterviewService);
    execute(command: FeedbackUpdateCommand): Promise<any>;
    update(id: string, entity: ICandidateFeedbackCreateInput): Promise<ICandidateFeedback>;
}

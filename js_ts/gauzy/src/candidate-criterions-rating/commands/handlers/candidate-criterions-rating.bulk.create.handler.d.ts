import { ICommandHandler } from '@nestjs/cqrs';
import { CandidateCriterionsRatingBulkCreateCommand } from '../candidate-criterions-rating.bulk.create.command';
import { CandidateCriterionsRatingService } from '../../candidate-criterion-rating.service';
export declare class CandidateCriterionsRatingBulkCreateHandler implements ICommandHandler<CandidateCriterionsRatingBulkCreateCommand> {
    private readonly candidateCriterionsRatingService;
    constructor(candidateCriterionsRatingService: CandidateCriterionsRatingService);
    execute(command: CandidateCriterionsRatingBulkCreateCommand): Promise<any>;
}

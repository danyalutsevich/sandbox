import { ICommandHandler } from '@nestjs/cqrs';
import { CandidateCriterionsRatingBulkDeleteCommand } from '../candidate-criterions-rating.bulk.delete.command';
import { CandidateCriterionsRatingService } from '../../candidate-criterion-rating.service';
export declare class CandidateCriterionsRatingBulkDeleteHandler implements ICommandHandler<CandidateCriterionsRatingBulkDeleteCommand> {
    private readonly candidateCriterionsRatingService;
    constructor(candidateCriterionsRatingService: CandidateCriterionsRatingService);
    execute(command: CandidateCriterionsRatingBulkDeleteCommand): Promise<any>;
}

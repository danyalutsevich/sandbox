import { ICommand } from '@nestjs/cqrs';
export declare class CandidateCriterionsRatingBulkDeleteCommand implements ICommand {
    readonly id: string;
    static readonly type = "[CandidateCriterionsRating] Delete";
    constructor(id: string);
}

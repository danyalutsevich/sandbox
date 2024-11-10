import { ICommand } from '@nestjs/cqrs';
export declare class CandidateCriterionsRatingBulkCreateCommand implements ICommand {
    readonly feedbackId: string;
    readonly technologies: any[];
    readonly qualities: any[];
    static readonly type = "[CandidateCriterionsRating] Register";
    constructor(feedbackId: string, technologies: any[], qualities: any[]);
}

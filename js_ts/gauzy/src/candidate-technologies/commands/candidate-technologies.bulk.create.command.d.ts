import { ICommand } from '@nestjs/cqrs';
export declare class CandidateTechnologiesBulkCreateCommand implements ICommand {
    readonly interviewId: string;
    readonly technologies: string[];
    static readonly type = "[CandidateTechnologies] Register";
    constructor(interviewId: string, technologies: string[]);
}

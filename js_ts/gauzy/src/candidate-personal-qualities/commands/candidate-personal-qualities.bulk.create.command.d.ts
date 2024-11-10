import { ICommand } from '@nestjs/cqrs';
export declare class CandidatePersonalQualitiesBulkCreateCommand implements ICommand {
    readonly interviewId: string;
    readonly personalQualities: string[];
    static readonly type = "[CandidatePersonalQualities] Register";
    constructor(interviewId: string, personalQualities: string[]);
}

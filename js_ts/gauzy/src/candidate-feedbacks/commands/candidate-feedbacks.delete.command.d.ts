import { ICommand } from '@nestjs/cqrs';
export declare class FeedbackDeleteCommand implements ICommand {
    readonly feedbackId: string;
    readonly interviewId: string;
    static readonly type = "[Feedback] Delete";
    constructor(feedbackId: string, interviewId: string);
}

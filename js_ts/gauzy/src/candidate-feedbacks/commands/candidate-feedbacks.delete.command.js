"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackDeleteCommand = void 0;
class FeedbackDeleteCommand {
    feedbackId;
    interviewId;
    static type = '[Feedback] Delete';
    constructor(feedbackId, interviewId) {
        this.feedbackId = feedbackId;
        this.interviewId = interviewId;
    }
}
exports.FeedbackDeleteCommand = FeedbackDeleteCommand;
//# sourceMappingURL=candidate-feedbacks.delete.command.js.map
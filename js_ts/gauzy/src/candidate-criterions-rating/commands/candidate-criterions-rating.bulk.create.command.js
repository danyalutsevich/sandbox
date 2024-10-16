"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateCriterionsRatingBulkCreateCommand = void 0;
class CandidateCriterionsRatingBulkCreateCommand {
    feedbackId;
    technologies;
    qualities;
    static type = '[CandidateCriterionsRating] Register';
    constructor(feedbackId, technologies, qualities) {
        this.feedbackId = feedbackId;
        this.technologies = technologies;
        this.qualities = qualities;
    }
}
exports.CandidateCriterionsRatingBulkCreateCommand = CandidateCriterionsRatingBulkCreateCommand;
//# sourceMappingURL=candidate-criterions-rating.bulk.create.command.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackDeleteHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const candidate_feedbacks_delete_command_1 = require("../candidate-feedbacks.delete.command");
const candidate_feedbacks_service_1 = require("../../candidate-feedbacks.service");
const candidate_interview_service_1 = require("../../../candidate-interview/candidate-interview.service");
let FeedbackDeleteHandler = exports.FeedbackDeleteHandler = class FeedbackDeleteHandler {
    candidateFeedbackService;
    candidateInterviewService;
    constructor(candidateFeedbackService, candidateInterviewService) {
        this.candidateFeedbackService = candidateFeedbackService;
        this.candidateInterviewService = candidateInterviewService;
    }
    async execute(command) {
        const { feedbackId, interviewId } = command;
        const feedback = await this.delete(feedbackId);
        if (feedback && interviewId) {
            const id = interviewId;
            const feedbacks = await this.candidateFeedbackService.getFeedbacksByInterviewId(id);
            let interviewRating;
            if (feedbacks.length > 0) {
                interviewRating = this.candidateFeedbackService.calcRating(feedbacks);
                await this.candidateInterviewService.create({
                    id: id,
                    rating: interviewRating
                });
            }
            else {
                await this.candidateInterviewService.create({
                    id: id,
                    rating: 0
                });
            }
            return;
        }
    }
    async delete(id) {
        return this.candidateFeedbackService.delete(id);
    }
};
exports.FeedbackDeleteHandler = FeedbackDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(candidate_feedbacks_delete_command_1.FeedbackDeleteCommand),
    __metadata("design:paramtypes", [candidate_feedbacks_service_1.CandidateFeedbacksService,
        candidate_interview_service_1.CandidateInterviewService])
], FeedbackDeleteHandler);
//# sourceMappingURL=candidate-feedbacks.delete.handler.js.map
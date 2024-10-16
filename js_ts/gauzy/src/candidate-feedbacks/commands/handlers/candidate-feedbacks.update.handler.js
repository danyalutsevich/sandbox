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
exports.FeedbackUpdateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("../../../../plugins/common");
const candidate_feedbacks_update_command_1 = require("../candidate-feedbacks.update.command");
const candidate_feedbacks_service_1 = require("../../candidate-feedbacks.service");
const candidate_interview_service_1 = require("../../../candidate-interview/candidate-interview.service");
let FeedbackUpdateHandler = exports.FeedbackUpdateHandler = class FeedbackUpdateHandler {
    candidateFeedbackService;
    candidateInterviewService;
    constructor(candidateFeedbackService, candidateInterviewService) {
        this.candidateFeedbackService = candidateFeedbackService;
        this.candidateInterviewService = candidateInterviewService;
    }
    async execute(command) {
        const { id } = command;
        const { entity } = command;
        const feedback = await this.update(id, entity);
        if (feedback) {
            const interviewId = entity.interviewer ? entity.interviewer.interviewId : null;
            if (interviewId) {
                const feedbacks = await this.candidateFeedbackService.getFeedbacksByInterviewId(interviewId);
                let interviewRating;
                if ((0, common_1.isNotEmpty)(feedbacks)) {
                    interviewRating = this.candidateFeedbackService.calcRating(feedbacks);
                    await this.candidateInterviewService.create({
                        id: interviewId,
                        rating: interviewRating
                    });
                }
            }
            return feedback;
        }
    }
    async update(id, entity) {
        return this.candidateFeedbackService.create({
            id,
            ...entity
        });
    }
};
exports.FeedbackUpdateHandler = FeedbackUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(candidate_feedbacks_update_command_1.FeedbackUpdateCommand),
    __metadata("design:paramtypes", [candidate_feedbacks_service_1.CandidateFeedbacksService,
        candidate_interview_service_1.CandidateInterviewService])
], FeedbackUpdateHandler);
//# sourceMappingURL=candidate-feedbacks.update.handler.js.map
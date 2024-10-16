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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateFeedbacksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const context_1 = require("./../core/context");
const crud_1 = require("./../core/crud");
const candidate_feedbacks_entity_1 = require("./candidate-feedbacks.entity");
const mikro_orm_candidate_feedback_repository_1 = require("./repository/mikro-orm-candidate-feedback.repository");
const type_orm_candidate_feedback_repository_1 = require("./repository/type-orm-candidate-feedback.repository");
let CandidateFeedbacksService = exports.CandidateFeedbacksService = class CandidateFeedbacksService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmCandidateFeedbackRepository, mikroOrmCandidateFeedbackRepository) {
        super(typeOrmCandidateFeedbackRepository, mikroOrmCandidateFeedbackRepository);
    }
    /**
     *
     * @param interviewId
     * @returns
     */
    async getFeedbacksByInterviewId(interviewId) {
        return await super.find({
            where: {
                interviewId,
                tenantId: context_1.RequestContext.currentTenantId()
            }
        });
    }
    /**
     *
     * @param feedbacks
     * @returns
     */
    calcRating(feedbacks) {
        const rate = [];
        feedbacks.forEach((fb) => {
            rate.push(Number(fb.rating));
        });
        const fbSum = rate.reduce((sum, current) => {
            return sum + current;
        });
        return fbSum / feedbacks.length;
    }
};
exports.CandidateFeedbacksService = CandidateFeedbacksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(candidate_feedbacks_entity_1.CandidateFeedback)),
    __metadata("design:paramtypes", [type_orm_candidate_feedback_repository_1.TypeOrmCandidateFeedbackRepository,
        mikro_orm_candidate_feedback_repository_1.MikroOrmCandidateFeedbackRepository])
], CandidateFeedbacksService);
//# sourceMappingURL=candidate-feedbacks.service.js.map
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
exports.CandidateCriterionsRatingBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const candidate_criterions_rating_bulk_create_command_1 = require("../candidate-criterions-rating.bulk.create.command");
const candidate_criterion_rating_service_1 = require("../../candidate-criterion-rating.service");
let CandidateCriterionsRatingBulkCreateHandler = exports.CandidateCriterionsRatingBulkCreateHandler = class CandidateCriterionsRatingBulkCreateHandler {
    candidateCriterionsRatingService;
    constructor(candidateCriterionsRatingService) {
        this.candidateCriterionsRatingService = candidateCriterionsRatingService;
    }
    async execute(command) {
        const { feedbackId, technologies, qualities } = command;
        let technologyRating;
        const technologyCreateInput = [];
        for (const item of technologies) {
            technologyRating = {
                rating: item.rating,
                technologyId: item.id,
                feedbackId: feedbackId,
                organizationId: item.organizationId,
                tenantId: item.tenantId
            };
            technologyCreateInput.push(technologyRating);
        }
        let qualityRating;
        const qualityCreateInput = [];
        for (const item of qualities) {
            qualityRating = {
                rating: item.rating,
                personalQualityId: item.id,
                feedbackId: feedbackId,
                organizationId: item.organizationId,
                tenantId: item.tenantId
            };
            qualityCreateInput.push(qualityRating);
        }
        return await this.candidateCriterionsRatingService.createBulk(technologyCreateInput, qualityCreateInput);
    }
};
exports.CandidateCriterionsRatingBulkCreateHandler = CandidateCriterionsRatingBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(candidate_criterions_rating_bulk_create_command_1.CandidateCriterionsRatingBulkCreateCommand),
    __metadata("design:paramtypes", [candidate_criterion_rating_service_1.CandidateCriterionsRatingService])
], CandidateCriterionsRatingBulkCreateHandler);
//# sourceMappingURL=candidate-criterions-rating.bulk.create.handler.js.map
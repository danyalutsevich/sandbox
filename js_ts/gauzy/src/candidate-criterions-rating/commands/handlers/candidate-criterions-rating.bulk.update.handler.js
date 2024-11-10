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
exports.CandidateCriterionsRatingBulkUpdateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const candidate_criterion_rating_service_1 = require("../../candidate-criterion-rating.service");
const candidate_criterions_rating_bulk_update_command_1 = require("../candidate-criterions-rating.bulk.update.command");
let CandidateCriterionsRatingBulkUpdateHandler = exports.CandidateCriterionsRatingBulkUpdateHandler = class CandidateCriterionsRatingBulkUpdateHandler {
    candidateCriterionsRatingService;
    constructor(candidateCriterionsRatingService) {
        this.candidateCriterionsRatingService = candidateCriterionsRatingService;
    }
    async execute(command) {
        const { data } = command;
        return this.candidateCriterionsRatingService.updateBulk(this.setRating(data.personalQualities, data.criterionsRating.filter((tech) => tech.personalQualityId)), this.setRating(data.technologies, data.criterionsRating.filter((tech) => tech.technologyId)));
    }
    setRating(ratings, data) {
        for (let i = 0; i < ratings.length; i++) {
            data[i].rating = ratings[i];
        }
        return data;
    }
};
exports.CandidateCriterionsRatingBulkUpdateHandler = CandidateCriterionsRatingBulkUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(candidate_criterions_rating_bulk_update_command_1.CandidateCriterionsRatingBulkUpdateCommand),
    __metadata("design:paramtypes", [candidate_criterion_rating_service_1.CandidateCriterionsRatingService])
], CandidateCriterionsRatingBulkUpdateHandler);
//# sourceMappingURL=candidate-criterions-rating.bulk.update.handler.js.map
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
exports.CandidateCriterionsRatingBulkDeleteHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const candidate_criterions_rating_bulk_delete_command_1 = require("../candidate-criterions-rating.bulk.delete.command");
const candidate_criterion_rating_service_1 = require("../../candidate-criterion-rating.service");
let CandidateCriterionsRatingBulkDeleteHandler = exports.CandidateCriterionsRatingBulkDeleteHandler = class CandidateCriterionsRatingBulkDeleteHandler {
    candidateCriterionsRatingService;
    constructor(candidateCriterionsRatingService) {
        this.candidateCriterionsRatingService = candidateCriterionsRatingService;
    }
    async execute(command) {
        const { id } = command;
        const criterions = await this.candidateCriterionsRatingService.getCriterionsByFeedbackId(id);
        if (criterions.length > 0) {
            await this.candidateCriterionsRatingService.deleteBulk(criterions.map((item) => item.id));
        }
        return;
    }
};
exports.CandidateCriterionsRatingBulkDeleteHandler = CandidateCriterionsRatingBulkDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(candidate_criterions_rating_bulk_delete_command_1.CandidateCriterionsRatingBulkDeleteCommand),
    __metadata("design:paramtypes", [candidate_criterion_rating_service_1.CandidateCriterionsRatingService])
], CandidateCriterionsRatingBulkDeleteHandler);
//# sourceMappingURL=candidate-criterions-rating.bulk.delete.handler.js.map
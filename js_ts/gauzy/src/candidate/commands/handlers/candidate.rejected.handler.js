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
exports.CandidateRejectedHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const index_1 = require("../../../../plugins/contracts/dist/index");
const candidate_service_1 = require("../../candidate.service");
const candidate_rejected_command_1 = require("../candidate.rejected.command");
let CandidateRejectedHandler = exports.CandidateRejectedHandler = class CandidateRejectedHandler {
    candidateService;
    constructor(candidateService) {
        this.candidateService = candidateService;
    }
    /**
     * Executes the candidate rejection process.
     *
     * @param {CandidateRejectedCommand} command - The command containing the candidate ID.
     * @returns {Promise<ICandidate>} - The updated candidate object.
     * @throws {ConflictException} - If the candidate is already hired.
     * @throws {BadRequestException} - If there is an error during the update process.
     */
    async execute({ id }) {
        // Fetch the candidate by ID
        const candidate = await this.candidateService.findOneByIdString(id);
        // Check if the candidate is already hired
        if (candidate.alreadyHired) {
            throw new common_1.ConflictException('The candidate is already hired, you cannot reject it.');
        }
        try {
            // Prepare the updated candidate data
            const updatedCandidate = {
                status: index_1.CandidateStatusEnum.REJECTED,
                rejectDate: candidate.rejectDate || new Date(),
                hiredDate: null // Clear the hired date
            };
            // Update the candidate in the database
            await this.candidateService.update(id, updatedCandidate);
            // Return the merged candidate object with the updated data
            return { ...candidate, ...updatedCandidate };
        }
        catch (error) {
            // Handle any errors that occur during the update process
            throw new common_1.BadRequestException(error.message || error);
        }
    }
};
exports.CandidateRejectedHandler = CandidateRejectedHandler = __decorate([
    (0, cqrs_1.CommandHandler)(candidate_rejected_command_1.CandidateRejectedCommand),
    __metadata("design:paramtypes", [candidate_service_1.CandidateService])
], CandidateRejectedHandler);
//# sourceMappingURL=candidate.rejected.handler.js.map
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
exports.CandidatePersonalQualitiesBulkDeleteHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const candidate_personal_qualities_bulk_delete_command_1 = require("../candidate-personal-qualities.bulk.delete.command");
const candidate_personal_qualities_service_1 = require("../../candidate-personal-qualities.service");
let CandidatePersonalQualitiesBulkDeleteHandler = exports.CandidatePersonalQualitiesBulkDeleteHandler = class CandidatePersonalQualitiesBulkDeleteHandler {
    candidatePersonalQualitiesService;
    constructor(candidatePersonalQualitiesService) {
        this.candidatePersonalQualitiesService = candidatePersonalQualitiesService;
    }
    async execute(command) {
        const { id, personalQualities } = command;
        if (personalQualities) {
            await this.candidatePersonalQualitiesService.deleteBulk(personalQualities.map((item) => item.id));
        }
        else {
            const qualities = await this.candidatePersonalQualitiesService.getPersonalQualitiesByInterviewId(id);
            await this.candidatePersonalQualitiesService.deleteBulk(qualities.map((item) => item.id));
        }
        return;
    }
};
exports.CandidatePersonalQualitiesBulkDeleteHandler = CandidatePersonalQualitiesBulkDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(candidate_personal_qualities_bulk_delete_command_1.CandidatePersonalQualitiesBulkDeleteCommand),
    __metadata("design:paramtypes", [candidate_personal_qualities_service_1.CandidatePersonalQualitiesService])
], CandidatePersonalQualitiesBulkDeleteHandler);
//# sourceMappingURL=candidate-personal-qualities.bulk.delete.handler.js.map
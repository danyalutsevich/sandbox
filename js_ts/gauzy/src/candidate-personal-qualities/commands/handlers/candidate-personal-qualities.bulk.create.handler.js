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
exports.CandidatePersonalQualitiesBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const candidate_personal_qualities_bulk_create_command_1 = require("../candidate-personal-qualities.bulk.create.command");
const candidate_personal_qualities_service_1 = require("../../candidate-personal-qualities.service");
let CandidatePersonalQualitiesBulkCreateHandler = exports.CandidatePersonalQualitiesBulkCreateHandler = class CandidatePersonalQualitiesBulkCreateHandler {
    candidatePersonalQualitiesService;
    constructor(candidatePersonalQualitiesService) {
        this.candidatePersonalQualitiesService = candidatePersonalQualitiesService;
    }
    async execute(command) {
        const { interviewId, personalQualities } = command;
        let personalQuality;
        const createInput = [];
        for (const item of personalQualities) {
            personalQuality = { name: item, interviewId: interviewId };
            createInput.push(personalQuality);
        }
        return await this.candidatePersonalQualitiesService.createBulk(createInput);
    }
};
exports.CandidatePersonalQualitiesBulkCreateHandler = CandidatePersonalQualitiesBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(candidate_personal_qualities_bulk_create_command_1.CandidatePersonalQualitiesBulkCreateCommand),
    __metadata("design:paramtypes", [candidate_personal_qualities_service_1.CandidatePersonalQualitiesService])
], CandidatePersonalQualitiesBulkCreateHandler);
//# sourceMappingURL=candidate-personal-qualities.bulk.create.handler.js.map
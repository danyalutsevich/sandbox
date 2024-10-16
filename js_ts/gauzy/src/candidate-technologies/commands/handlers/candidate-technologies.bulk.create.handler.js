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
exports.CandidateTechnologiesBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const candidate_technologies_bulk_create_command_1 = require("../candidate-technologies.bulk.create.command");
const candidate_technologies_service_1 = require("../../candidate-technologies.service");
let CandidateTechnologiesBulkCreateHandler = exports.CandidateTechnologiesBulkCreateHandler = class CandidateTechnologiesBulkCreateHandler {
    candidateTechnologiesService;
    constructor(candidateTechnologiesService) {
        this.candidateTechnologiesService = candidateTechnologiesService;
    }
    async execute(command) {
        const { interviewId, technologies } = command;
        let technology;
        const createInput = [];
        for (const item of technologies) {
            technology = { name: item, interviewId: interviewId };
            createInput.push(technology);
        }
        return await this.candidateTechnologiesService.createBulk(createInput);
    }
};
exports.CandidateTechnologiesBulkCreateHandler = CandidateTechnologiesBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(candidate_technologies_bulk_create_command_1.CandidateTechnologiesBulkCreateCommand),
    __metadata("design:paramtypes", [candidate_technologies_service_1.CandidateTechnologiesService])
], CandidateTechnologiesBulkCreateHandler);
//# sourceMappingURL=candidate-technologies.bulk.create.handler.js.map
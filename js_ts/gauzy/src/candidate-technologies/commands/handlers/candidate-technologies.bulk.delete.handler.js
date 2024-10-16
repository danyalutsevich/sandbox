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
exports.CandidateTechnologiesBulkDeleteHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const candidate_technologies_bulk_delete_command_1 = require("../candidate-technologies.bulk.delete.command");
const candidate_technologies_service_1 = require("../../candidate-technologies.service");
let CandidateTechnologiesBulkDeleteHandler = exports.CandidateTechnologiesBulkDeleteHandler = class CandidateTechnologiesBulkDeleteHandler {
    candidateTechnologiesService;
    constructor(candidateTechnologiesService) {
        this.candidateTechnologiesService = candidateTechnologiesService;
    }
    async execute(command) {
        const { id, technologies } = command;
        if (technologies) {
            await this.candidateTechnologiesService.deleteBulk(technologies.map((item) => item.id));
        }
        else {
            const technologies = await this.candidateTechnologiesService.getTechnologiesByInterviewId(id);
            await this.candidateTechnologiesService.deleteBulk(technologies.map((item) => item.id));
        }
        return;
    }
};
exports.CandidateTechnologiesBulkDeleteHandler = CandidateTechnologiesBulkDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(candidate_technologies_bulk_delete_command_1.CandidateTechnologiesBulkDeleteCommand),
    __metadata("design:paramtypes", [candidate_technologies_service_1.CandidateTechnologiesService])
], CandidateTechnologiesBulkDeleteHandler);
//# sourceMappingURL=candidate-technologies.bulk.delete.handler.js.map
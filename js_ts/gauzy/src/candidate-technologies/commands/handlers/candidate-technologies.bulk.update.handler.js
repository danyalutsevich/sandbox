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
exports.CandidateTechnologiesBulkUpdateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const candidate_technologies_service_1 = require("../../candidate-technologies.service");
const candidate_technologies_bulk_update_command_1 = require("../candidate-technologies.bulk.update.command");
let CandidateTechnologiesBulkUpdateHandler = exports.CandidateTechnologiesBulkUpdateHandler = class CandidateTechnologiesBulkUpdateHandler {
    candidateTechnologiesService;
    constructor(candidateTechnologiesService) {
        this.candidateTechnologiesService = candidateTechnologiesService;
    }
    async execute(command) {
        const { technologies } = command;
        // TO DO
        technologies.forEach((item) => this.candidateTechnologiesService.update(item.id, { ...item }));
        return;
    }
};
exports.CandidateTechnologiesBulkUpdateHandler = CandidateTechnologiesBulkUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(candidate_technologies_bulk_update_command_1.CandidateTechnologiesBulkUpdateCommand),
    __metadata("design:paramtypes", [candidate_technologies_service_1.CandidateTechnologiesService])
], CandidateTechnologiesBulkUpdateHandler);
//# sourceMappingURL=candidate-technologies.bulk.update.handler.js.map
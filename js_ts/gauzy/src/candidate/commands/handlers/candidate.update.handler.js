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
exports.CandidateUpdateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const candidate_service_1 = require("../../candidate.service");
const candidate_update_command_1 = require("../candidate.update.command");
let CandidateUpdateHandler = exports.CandidateUpdateHandler = class CandidateUpdateHandler {
    candidateService;
    constructor(candidateService) {
        this.candidateService = candidateService;
    }
    async execute(command) {
        const { input } = command;
        const { id } = input;
        try {
            //We are using create here because create calls the method save()
            //We need save() to save ManyToMany relations
            return await this.candidateService.create({
                id,
                ...input
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.CandidateUpdateHandler = CandidateUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(candidate_update_command_1.CandidateUpdateCommand),
    __metadata("design:paramtypes", [candidate_service_1.CandidateService])
], CandidateUpdateHandler);
//# sourceMappingURL=candidate.update.handler.js.map
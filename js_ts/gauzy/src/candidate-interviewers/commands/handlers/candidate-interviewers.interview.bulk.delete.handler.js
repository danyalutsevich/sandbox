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
exports.CandidateInterviewersInterviewBulkDeleteHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const candidate_interviewers_service_1 = require("../../candidate-interviewers.service");
const candidate_interviewers_interview_bulk_delete_command_1 = require("../candidate-interviewers.interview.bulk.delete.command");
let CandidateInterviewersInterviewBulkDeleteHandler = exports.CandidateInterviewersInterviewBulkDeleteHandler = class CandidateInterviewersInterviewBulkDeleteHandler {
    candidateInterviewersService;
    constructor(candidateInterviewersService) {
        this.candidateInterviewersService = candidateInterviewersService;
    }
    async execute(command) {
        const { id } = command;
        const interviewers = await this.candidateInterviewersService.getInterviewersByInterviewId(id);
        await this.candidateInterviewersService.deleteBulk(interviewers.map((item) => item.id));
        return;
    }
};
exports.CandidateInterviewersInterviewBulkDeleteHandler = CandidateInterviewersInterviewBulkDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(candidate_interviewers_interview_bulk_delete_command_1.CandidateInterviewersInterviewBulkDeleteCommand),
    __metadata("design:paramtypes", [candidate_interviewers_service_1.CandidateInterviewersService])
], CandidateInterviewersInterviewBulkDeleteHandler);
//# sourceMappingURL=candidate-interviewers.interview.bulk.delete.handler.js.map
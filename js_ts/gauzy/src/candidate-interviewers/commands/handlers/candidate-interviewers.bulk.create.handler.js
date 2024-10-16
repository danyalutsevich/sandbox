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
exports.CandidateInterviewersBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const candidate_interviewers_bulk_create_command_1 = require("../candidate-interviewers.bulk.create.command");
const candidate_interviewers_service_1 = require("../../candidate-interviewers.service");
let CandidateInterviewersBulkCreateHandler = exports.CandidateInterviewersBulkCreateHandler = class CandidateInterviewersBulkCreateHandler {
    candidateInterviewersService;
    constructor(candidateInterviewersService) {
        this.candidateInterviewersService = candidateInterviewersService;
    }
    async execute(command) {
        const { input } = command;
        let interviewer;
        const createInput = [];
        const { employeeIds, interviewId, organizationId, tenantId } = input;
        for (const employeeId of employeeIds) {
            interviewer = { interviewId, employeeId, organizationId, tenantId };
            createInput.push(interviewer);
        }
        return await this.candidateInterviewersService.createBulk(createInput);
    }
};
exports.CandidateInterviewersBulkCreateHandler = CandidateInterviewersBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(candidate_interviewers_bulk_create_command_1.CandidateInterviewersBulkCreateCommand),
    __metadata("design:paramtypes", [candidate_interviewers_service_1.CandidateInterviewersService])
], CandidateInterviewersBulkCreateHandler);
//# sourceMappingURL=candidate-interviewers.bulk.create.handler.js.map
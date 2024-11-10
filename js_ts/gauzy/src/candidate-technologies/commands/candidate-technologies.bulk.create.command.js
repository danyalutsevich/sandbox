"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateTechnologiesBulkCreateCommand = void 0;
class CandidateTechnologiesBulkCreateCommand {
    interviewId;
    technologies;
    static type = '[CandidateTechnologies] Register';
    constructor(interviewId, technologies) {
        this.interviewId = interviewId;
        this.technologies = technologies;
    }
}
exports.CandidateTechnologiesBulkCreateCommand = CandidateTechnologiesBulkCreateCommand;
//# sourceMappingURL=candidate-technologies.bulk.create.command.js.map
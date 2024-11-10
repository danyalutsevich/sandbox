"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidatePersonalQualitiesBulkCreateCommand = void 0;
class CandidatePersonalQualitiesBulkCreateCommand {
    interviewId;
    personalQualities;
    static type = '[CandidatePersonalQualities] Register';
    constructor(interviewId, personalQualities) {
        this.interviewId = interviewId;
        this.personalQualities = personalQualities;
    }
}
exports.CandidatePersonalQualitiesBulkCreateCommand = CandidatePersonalQualitiesBulkCreateCommand;
//# sourceMappingURL=candidate-personal-qualities.bulk.create.command.js.map
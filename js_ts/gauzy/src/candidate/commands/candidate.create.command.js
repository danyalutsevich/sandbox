"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateCreateCommand = void 0;
class CandidateCreateCommand {
    input;
    languageCode;
    originUrl;
    static type = '[Candidate] Create';
    constructor(input, languageCode, originUrl) {
        this.input = input;
        this.languageCode = languageCode;
        this.originUrl = originUrl;
    }
}
exports.CandidateCreateCommand = CandidateCreateCommand;
//# sourceMappingURL=candidate.create.command.js.map
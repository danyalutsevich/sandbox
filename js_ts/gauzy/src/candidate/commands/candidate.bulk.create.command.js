"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateBulkCreateCommand = void 0;
class CandidateBulkCreateCommand {
    input;
    languageCode;
    originUrl;
    static type = '[Candidate] Bulk Create';
    constructor(input, languageCode, originUrl) {
        this.input = input;
        this.languageCode = languageCode;
        this.originUrl = originUrl;
    }
}
exports.CandidateBulkCreateCommand = CandidateBulkCreateCommand;
//# sourceMappingURL=candidate.bulk.create.command.js.map
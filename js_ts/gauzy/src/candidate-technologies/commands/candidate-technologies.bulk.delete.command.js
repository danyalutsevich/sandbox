"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateTechnologiesBulkDeleteCommand = void 0;
class CandidateTechnologiesBulkDeleteCommand {
    id;
    technologies;
    static type = '[CandidateTechnologies] Delete';
    constructor(id, technologies) {
        this.id = id;
        this.technologies = technologies;
    }
}
exports.CandidateTechnologiesBulkDeleteCommand = CandidateTechnologiesBulkDeleteCommand;
//# sourceMappingURL=candidate-technologies.bulk.delete.command.js.map
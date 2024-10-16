"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const candidate_personal_qualities_bulk_delete_handler_1 = require("./candidate-personal-qualities.bulk.delete.handler");
const candidate_personal_qualities_bulk_create_handler_1 = require("./candidate-personal-qualities.bulk.create.handler");
exports.CommandHandlers = [
    candidate_personal_qualities_bulk_delete_handler_1.CandidatePersonalQualitiesBulkDeleteHandler,
    candidate_personal_qualities_bulk_create_handler_1.CandidatePersonalQualitiesBulkCreateHandler
];
//# sourceMappingURL=index.js.map
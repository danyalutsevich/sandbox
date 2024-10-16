"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const candidate_bulk_create_handler_1 = require("./candidate.bulk.create.handler");
const candidate_create_handler_1 = require("./candidate.create.handler");
const candidate_hired_handler_1 = require("./candidate.hired.handler");
const candidate_rejected_handler_1 = require("./candidate.rejected.handler");
const candidate_update_handler_1 = require("./candidate.update.handler");
exports.CommandHandlers = [
    candidate_bulk_create_handler_1.CandidateBulkCreateHandler,
    candidate_create_handler_1.CandidateCreateHandler,
    candidate_update_handler_1.CandidateUpdateHandler,
    candidate_hired_handler_1.CandidateHiredHandler,
    candidate_rejected_handler_1.CandidateRejectedHandler
];
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const candidate_technologies_bulk_delete_handler_1 = require("./candidate-technologies.bulk.delete.handler");
const candidate_technologies_bulk_create_handler_1 = require("./candidate-technologies.bulk.create.handler");
const candidate_technologies_bulk_update_handler_1 = require("./candidate-technologies.bulk.update.handler");
exports.CommandHandlers = [
    candidate_technologies_bulk_delete_handler_1.CandidateTechnologiesBulkDeleteHandler,
    candidate_technologies_bulk_create_handler_1.CandidateTechnologiesBulkCreateHandler,
    candidate_technologies_bulk_update_handler_1.CandidateTechnologiesBulkUpdateHandler
];
//# sourceMappingURL=index.js.map
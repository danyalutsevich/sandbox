"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const candidate_criterions_rating_bulk_delete_handler_1 = require("./candidate-criterions-rating.bulk.delete.handler");
const candidate_criterions_rating_bulk_create_handler_1 = require("./candidate-criterions-rating.bulk.create.handler");
const candidate_criterions_rating_bulk_update_handler_1 = require("./candidate-criterions-rating.bulk.update.handler");
exports.CommandHandlers = [
    candidate_criterions_rating_bulk_delete_handler_1.CandidateCriterionsRatingBulkDeleteHandler,
    candidate_criterions_rating_bulk_create_handler_1.CandidateCriterionsRatingBulkCreateHandler,
    candidate_criterions_rating_bulk_update_handler_1.CandidateCriterionsRatingBulkUpdateHandler
];
//# sourceMappingURL=index.js.map
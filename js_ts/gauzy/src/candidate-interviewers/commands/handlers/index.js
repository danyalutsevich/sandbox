"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const candidate_interviewers_interview_bulk_delete_handler_1 = require("./candidate-interviewers.interview.bulk.delete.handler");
const candidate_interviewers_employee_bulk_delete_handler_1 = require("./candidate-interviewers.employee.bulk.delete.handler");
const candidate_interviewers_bulk_create_handler_1 = require("./candidate-interviewers.bulk.create.handler");
exports.CommandHandlers = [
    candidate_interviewers_employee_bulk_delete_handler_1.CandidateInterviewersEmployeeBulkDeleteHandler,
    candidate_interviewers_interview_bulk_delete_handler_1.CandidateInterviewersInterviewBulkDeleteHandler,
    candidate_interviewers_bulk_create_handler_1.CandidateInterviewersBulkCreateHandler
];
//# sourceMappingURL=index.js.map
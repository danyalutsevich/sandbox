"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const timesheet_create_handler_1 = require("./timesheet-create.handler");
const timesheet_first_or_create_handler_1 = require("./timesheet-first-or-create.handler");
const timesheet_get_handler_1 = require("./timesheet-get.handler");
const timesheet_recalculate_handler_1 = require("./timesheet-recalculate.handler");
const timesheet_submit_handler_1 = require("./timesheet-submit.handler");
const timesheet_update_status_handler_1 = require("./timesheet-update-status.handler");
exports.CommandHandlers = [
    timesheet_create_handler_1.TimesheetCreateHandler,
    timesheet_first_or_create_handler_1.TimesheetFirstOrCreateHandler,
    timesheet_get_handler_1.TimesheetGetHandler,
    timesheet_recalculate_handler_1.TimesheetRecalculateHandler,
    timesheet_submit_handler_1.TimesheetSubmitHandler,
    timesheet_update_status_handler_1.TimesheetUpdateStatusHandler
];
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const time_log_create_handler_1 = require("./time-log-create.handler");
const time_log_update_handler_1 = require("./time-log-update.handler");
const time_log_delete_handler_1 = require("./time-log-delete.handler");
const delete_time_span_handler_1 = require("./delete-time-span.handler");
const get_conflict_time_log_handler_1 = require("./get-conflict-time-log.handler");
const get_time_log_group_by_date_handler_1 = require("./get-time-log-group-by-date.handler");
const get_time_log_group_by_employee_handler_1 = require("./get-time-log-group-by-employee.handler");
const get_time_log_group_by_project_handler_1 = require("./get-time-log-group-by-project.handler");
const get_time_log_group_by_client_handler_1 = require("./get-time-log-group-by-client.handler");
const schedule_time_log_entries_handler_1 = require("./schedule-time-log-entries.handler");
exports.CommandHandlers = [
    time_log_create_handler_1.TimeLogCreateHandler,
    time_log_update_handler_1.TimeLogUpdateHandler,
    time_log_delete_handler_1.TimeLogDeleteHandler,
    get_conflict_time_log_handler_1.GetConflictTimeLogHandler,
    delete_time_span_handler_1.DeleteTimeSpanHandler,
    get_time_log_group_by_date_handler_1.GetTimeLogGroupByDateHandler,
    get_time_log_group_by_project_handler_1.GetTimeLogGroupByProjectHandler,
    get_time_log_group_by_employee_handler_1.GetTimeLogGroupByEmployeeHandler,
    get_time_log_group_by_client_handler_1.GetTimeLogGroupByClientHandler,
    schedule_time_log_entries_handler_1.ScheduleTimeLogEntriesHandler
];
//# sourceMappingURL=index.js.map
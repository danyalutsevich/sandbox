"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const employee_bulk_create_handler_1 = require("./employee.bulk.create.handler");
const employee_create_handler_1 = require("./employee.create.handler");
const employee_get_handler_1 = require("./employee.get.handler");
const employee_update_handler_1 = require("./employee.update.handler");
const get_employee_job_statistics_handler_1 = require("./get-employee-job-statistics.handler");
const update_employee_job_search_status_handler_1 = require("./update-employee-job-search-status.handler");
const update_employee_total_worked_hours_handler_1 = require("./update-employee-total-worked-hours.handler");
const workig_employee_get_handler_1 = require("./workig-employee.get.handler");
exports.CommandHandlers = [
    employee_create_handler_1.EmployeeCreateHandler,
    employee_bulk_create_handler_1.EmployeeBulkCreateHandler,
    employee_get_handler_1.EmployeeGetHandler,
    update_employee_total_worked_hours_handler_1.UpdateEmployeeTotalWorkedHoursHandler,
    update_employee_job_search_status_handler_1.UpdateEmployeeJobSearchStatusHandler,
    get_employee_job_statistics_handler_1.GetEmployeeJobStatisticsHandler,
    employee_update_handler_1.EmployeeUpdateHandler,
    workig_employee_get_handler_1.WorkingEmployeeGetHandler
];
//# sourceMappingURL=index.js.map
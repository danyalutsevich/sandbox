"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryHandlers = void 0;
const aggregate_employee_statistic_handler_1 = require("./aggregate-employee-statistic.handler");
const month_aggregated_employee_statistics_handler_1 = require("./month-aggregated-employee-statistics.handler");
const employee_statistics_history_handler_1 = require("./employee-statistics-history.handler");
exports.QueryHandlers = [
    aggregate_employee_statistic_handler_1.AggregateOrganizationQueryHandler,
    month_aggregated_employee_statistics_handler_1.MonthAggregatedEmployeeStatisticsQueryHandler,
    employee_statistics_history_handler_1.EmployeeStatisticsHistoryQueryHandler
];
//# sourceMappingURL=index.js.map
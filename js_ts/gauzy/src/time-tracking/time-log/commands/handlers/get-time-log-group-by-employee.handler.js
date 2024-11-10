"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTimeLogGroupByEmployeeHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const underscore_1 = require("underscore");
const moment_1 = __importDefault(require("moment"));
;
const get_time_log_group_by_employee_command_1 = require("../get-time-log-group-by-employee.command");
const time_log_utils_1 = require("./../../time-log.utils");
let GetTimeLogGroupByEmployeeHandler = exports.GetTimeLogGroupByEmployeeHandler = class GetTimeLogGroupByEmployeeHandler {
    /**
     * Executes the command to generate a time log report grouped by employee.
     * @param command The command containing time logs and other parameters.
     * @returns A Promise that resolves to the generated report grouped by employee.
     */
    async execute(command) {
        const { timeLogs, timeZone = moment_1.default.tz.guess() } = command;
        const dailyLogs = (0, underscore_1.chain)(timeLogs)
            .groupBy((log) => log.employeeId)
            .map((byEmployeeLogs) => {
            // Calculate average duration for specific date range.
            const avgDuration = (0, time_log_utils_1.calculateAverage)((0, underscore_1.pluck)(byEmployeeLogs, 'duration'));
            // Calculate average activity for specific date range.
            const avgActivity = (0, time_log_utils_1.calculateAverageActivity)((0, underscore_1.chain)(byEmployeeLogs).pluck('timeSlots').flatten(true).value());
            // Extract employee information
            const employee = byEmployeeLogs.length > 0 ? byEmployeeLogs[0].employee : null;
            const byDate = (0, underscore_1.chain)(byEmployeeLogs)
                .groupBy((log) => moment_1.default.utc(log.startedAt).tz(timeZone).format('YYYY-MM-DD'))
                .map((byDateLogs, date) => ({
                date,
                projectLogs: this.getGroupByProject(byDateLogs)
            }))
                .value();
            return {
                employee,
                logs: byDate,
                sum: avgDuration || null,
                activity: parseFloat(parseFloat(avgActivity + '').toFixed(2))
            };
        })
            .value();
        return dailyLogs;
    }
    /**
     * Groups time logs by employee and calculates average duration and activity for each project.
     * @param logs An array of time logs.
     * @returns An array containing logs grouped by employee with calculated averages.
     */
    getGroupByProject(logs) {
        const byProject = (0, underscore_1.chain)(logs)
            .groupBy('projectId')
            .map((timeLogs) => {
            // Calculate average duration of the employee for specific project.
            const sum = (0, time_log_utils_1.calculateAverage)((0, underscore_1.pluck)(timeLogs, 'duration'));
            // Calculate Average activity of the employee
            const avgActivity = (0, time_log_utils_1.calculateAverageActivity)((0, underscore_1.chain)(timeLogs).pluck('timeSlots').flatten(true).value());
            // Retrieve employee details
            const project = timeLogs.length > 0 ? timeLogs[0].project : null;
            const task = timeLogs.length > 0 ? timeLogs[0].task : null;
            const client = timeLogs.length > 0
                ? timeLogs[0].organizationContact
                : project
                    ? project.organizationContact
                    : null;
            const description = timeLogs.length > 0 ? timeLogs[0].description : null;
            return {
                description,
                task,
                project,
                client,
                sum,
                activity: parseFloat(parseFloat(avgActivity + '').toFixed(2))
            };
        })
            .value();
        return byProject;
    }
};
exports.GetTimeLogGroupByEmployeeHandler = GetTimeLogGroupByEmployeeHandler = __decorate([
    (0, cqrs_1.CommandHandler)(get_time_log_group_by_employee_command_1.GetTimeLogGroupByEmployeeCommand)
], GetTimeLogGroupByEmployeeHandler);
//# sourceMappingURL=get-time-log-group-by-employee.handler.js.map
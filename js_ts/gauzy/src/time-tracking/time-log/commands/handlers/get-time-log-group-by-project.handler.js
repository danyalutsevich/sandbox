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
exports.GetTimeLogGroupByProjectHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const underscore_1 = require("underscore");
const moment_1 = __importDefault(require("moment"));
;
const get_time_log_group_by_project_command_1 = require("../get-time-log-group-by-project.command");
const time_log_utils_1 = require("./../../time-log.utils");
let GetTimeLogGroupByProjectHandler = exports.GetTimeLogGroupByProjectHandler = class GetTimeLogGroupByProjectHandler {
    /**
     * Executes the command to generate a time log report grouped by project.
     * @param command The command containing time logs and other parameters.
     * @returns A Promise that resolves to the generated report grouped by project.
     */
    async execute(command) {
        const { timeLogs, timeZone = moment_1.default.tz.guess() } = command;
        // Group timeLogs by projectId
        const dailyLogs = (0, underscore_1.chain)(timeLogs)
            .groupBy((log) => log.projectId)
            .map((byProjectLogs) => {
            // Calculate average duration for specific project.
            const avgDuration = (0, time_log_utils_1.calculateAverage)((0, underscore_1.pluck)(byProjectLogs, 'duration'));
            // Calculate average activity for specific project.
            const avgActivity = (0, time_log_utils_1.calculateAverageActivity)((0, underscore_1.chain)(byProjectLogs).pluck('timeSlots').flatten(true).value());
            // Extract project information
            const project = byProjectLogs.length > 0 ? byProjectLogs[0].project : null;
            // Extract client information using optional chaining
            const client = byProjectLogs.length > 0
                ? byProjectLogs[0].organizationContact
                : project
                    ? project.organizationContact
                    : null;
            // Group projectLogs by date
            const byDate = (0, underscore_1.chain)(byProjectLogs)
                .groupBy((log) => moment_1.default.utc(log.startedAt).tz(timeZone).format('YYYY-MM-DD'))
                .map((byDateLogs, date) => ({
                date,
                employeeLogs: this.getGroupByEmployee(byDateLogs)
            }))
                .value();
            return {
                project,
                client,
                logs: byDate,
                sum: avgDuration || null,
                activity: parseFloat(parseFloat(avgActivity + '').toFixed(2))
            };
        })
            .value();
        return dailyLogs;
    }
    /**
     * Groups time logs by employee and calculates average duration and activity for each employee.
     * @param logs An array of time logs.
     * @returns An array containing logs grouped by employee with calculated averages.
     */
    getGroupByEmployee(logs) {
        const byEmployee = (0, underscore_1.chain)(logs)
            .groupBy('employeeId')
            .map((timeLogs) => {
            // Calculate average duration of the employee for specific employee.
            const sum = (0, time_log_utils_1.calculateAverage)((0, underscore_1.pluck)(timeLogs, 'duration'));
            // Calculate Average activity of the employee
            const avgActivity = (0, time_log_utils_1.calculateAverageActivity)((0, underscore_1.chain)(timeLogs).pluck('timeSlots').flatten(true).value());
            // Retrieve employee details
            const task = timeLogs.length > 0 ? timeLogs[0].task : null;
            const employee = timeLogs.length > 0 ? timeLogs[0].employee : null;
            const description = timeLogs.length > 0 ? timeLogs[0].description : null;
            return {
                description,
                task,
                employee,
                sum,
                activity: parseFloat(parseFloat(avgActivity + '').toFixed(2))
            };
        })
            .value();
        return byEmployee;
    }
};
exports.GetTimeLogGroupByProjectHandler = GetTimeLogGroupByProjectHandler = __decorate([
    (0, cqrs_1.CommandHandler)(get_time_log_group_by_project_command_1.GetTimeLogGroupByProjectCommand)
], GetTimeLogGroupByProjectHandler);
//# sourceMappingURL=get-time-log-group-by-project.handler.js.map
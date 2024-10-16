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
exports.GetTimeLogGroupByClientHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const underscore_1 = require("underscore");
const moment_1 = __importDefault(require("moment"));
;
const get_time_log_group_by_client_command_1 = require("../get-time-log-group-by-client.command");
const time_log_utils_1 = require("./../../time-log.utils");
let GetTimeLogGroupByClientHandler = exports.GetTimeLogGroupByClientHandler = class GetTimeLogGroupByClientHandler {
    /**
     * Executes the command to generate a time log report grouped by client.
     * @param command The command containing time logs and other parameters.
     * @returns A Promise that resolves to the generated report grouped by client.
     */
    async execute(command) {
        const { timeLogs, timeZone = moment_1.default.tz.guess() } = command;
        // Group timeLogs by organizationContactId
        const dailyLogs = (0, underscore_1.chain)(timeLogs)
            .groupBy((log) => log.organizationContactId)
            .map((logs) => {
            // Calculate average duration for specific client.
            const avgDuration = (0, time_log_utils_1.calculateAverage)((0, underscore_1.pluck)(logs, 'duration'));
            // Calculate average activity for specific client.
            const avgActivity = (0, time_log_utils_1.calculateAverageActivity)((0, underscore_1.chain)(logs).pluck('timeSlots').flatten(true).value());
            // Retrieve the first log for further details
            const log = logs.length > 0 ? logs[0] : null;
            // Extract client information using optional chaining
            const client = log?.organizationContact ?? log?.project?.organizationContact ?? null;
            // Group logs by projectId
            const byClient = (0, underscore_1.chain)(logs)
                .groupBy((log) => log.projectId)
                .map((projectLogs) => {
                // Retrieve the first log for further details
                const project = projectLogs.length > 0 ? projectLogs[0].project : null;
                // Group projectLogs by date
                const byDate = (0, underscore_1.chain)(projectLogs)
                    .groupBy((log) => moment_1.default.utc(log.startedAt).tz(timeZone).format('YYYY-MM-DD'))
                    .map((dateLogs, date) => ({
                    date,
                    projectLogs: this.getGroupByEmployee(dateLogs) // Group dateLogs by employeeId
                }))
                    .value();
                return {
                    project,
                    logs: byDate
                };
            })
                .value();
            return {
                client,
                logs: byClient,
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
            // Calculate average duration for specific employee.
            const sum = (0, time_log_utils_1.calculateAverage)((0, underscore_1.pluck)(timeLogs, 'duration'));
            // Calculate average activity for specific employee.
            const avgActivity = (0, time_log_utils_1.calculateAverageActivity)((0, underscore_1.chain)(timeLogs).pluck('timeSlots').flatten(true).value());
            // Retrieve employee details
            const employee = timeLogs.length > 0 ? timeLogs[0].employee : null;
            const task = timeLogs.length > 0 ? timeLogs[0].task : null;
            const description = timeLogs.length > 0 ? timeLogs[0].description : null;
            return {
                description,
                task,
                employee,
                sum,
                activity: parseFloat(avgActivity.toFixed(2))
            };
        })
            .value();
        return byEmployee;
    }
};
exports.GetTimeLogGroupByClientHandler = GetTimeLogGroupByClientHandler = __decorate([
    (0, cqrs_1.CommandHandler)(get_time_log_group_by_client_command_1.GetTimeLogGroupByClientCommand)
], GetTimeLogGroupByClientHandler);
//# sourceMappingURL=get-time-log-group-by-client.handler.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTimeLogGroupByEmployeeCommand = void 0;
class GetTimeLogGroupByEmployeeCommand {
    timeLogs;
    timeZone;
    static type = '[TimeLog] group by employee';
    constructor(timeLogs, timeZone) {
        this.timeLogs = timeLogs;
        this.timeZone = timeZone;
    }
}
exports.GetTimeLogGroupByEmployeeCommand = GetTimeLogGroupByEmployeeCommand;
//# sourceMappingURL=get-time-log-group-by-employee.command.js.map
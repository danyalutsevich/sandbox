"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTimeLogGroupByDateCommand = void 0;
class GetTimeLogGroupByDateCommand {
    timeLogs;
    timeZone;
    static type = '[TimeLog] group by date';
    constructor(timeLogs, timeZone) {
        this.timeLogs = timeLogs;
        this.timeZone = timeZone;
    }
}
exports.GetTimeLogGroupByDateCommand = GetTimeLogGroupByDateCommand;
//# sourceMappingURL=get-time-log-group-by-date.command.js.map
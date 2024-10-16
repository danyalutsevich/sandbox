"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTimeLogGroupByClientCommand = void 0;
class GetTimeLogGroupByClientCommand {
    timeLogs;
    timeZone;
    static type = '[TimeLog] group by client';
    constructor(timeLogs, timeZone) {
        this.timeLogs = timeLogs;
        this.timeZone = timeZone;
    }
}
exports.GetTimeLogGroupByClientCommand = GetTimeLogGroupByClientCommand;
//# sourceMappingURL=get-time-log-group-by-client.command.js.map
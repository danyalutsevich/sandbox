"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTimeLogGroupByProjectCommand = void 0;
class GetTimeLogGroupByProjectCommand {
    timeLogs;
    timeZone;
    static type = '[TimeLog] group by project';
    constructor(timeLogs, timeZone) {
        this.timeLogs = timeLogs;
        this.timeZone = timeZone;
    }
}
exports.GetTimeLogGroupByProjectCommand = GetTimeLogGroupByProjectCommand;
//# sourceMappingURL=get-time-log-group-by-project.command.js.map
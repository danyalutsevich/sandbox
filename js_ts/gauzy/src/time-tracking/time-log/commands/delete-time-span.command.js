"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTimeSpanCommand = void 0;
class DeleteTimeSpanCommand {
    newTime;
    timeLog;
    timeSlot;
    static type = '[TimeLog] delete time span';
    constructor(newTime, timeLog, timeSlot) {
        this.newTime = newTime;
        this.timeLog = timeLog;
        this.timeSlot = timeSlot;
    }
}
exports.DeleteTimeSpanCommand = DeleteTimeSpanCommand;
//# sourceMappingURL=delete-time-span.command.js.map
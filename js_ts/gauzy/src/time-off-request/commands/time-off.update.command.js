"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeOffUpdateCommand = void 0;
class TimeOffUpdateCommand {
    id;
    timeOff;
    static type = '[TimeOff] update';
    constructor(id, timeOff) {
        this.id = id;
        this.timeOff = timeOff;
    }
}
exports.TimeOffUpdateCommand = TimeOffUpdateCommand;
//# sourceMappingURL=time-off.update.command.js.map
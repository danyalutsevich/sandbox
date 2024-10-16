"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeOffStatusCommand = void 0;
class TimeOffStatusCommand {
    id;
    status;
    static type = '[TimeOff] Status';
    constructor(id, status) {
        this.id = id;
        this.status = status;
    }
}
exports.TimeOffStatusCommand = TimeOffStatusCommand;
//# sourceMappingURL=time-off.status.command.js.map
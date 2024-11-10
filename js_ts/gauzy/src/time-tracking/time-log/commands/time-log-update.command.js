"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeLogUpdateCommand = void 0;
class TimeLogUpdateCommand {
    input;
    id;
    manualTimeSlot;
    static type = '[Time Tracking] Time Log update';
    constructor(input, id, manualTimeSlot) {
        this.input = input;
        this.id = id;
        this.manualTimeSlot = manualTimeSlot;
    }
}
exports.TimeLogUpdateCommand = TimeLogUpdateCommand;
//# sourceMappingURL=time-log-update.command.js.map
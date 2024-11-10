"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSlotMergeCommand = void 0;
class TimeSlotMergeCommand {
    organizationId;
    employeeId;
    start;
    end;
    static type = '[TimeSlot] merge';
    constructor(organizationId, employeeId, start, end) {
        this.organizationId = organizationId;
        this.employeeId = employeeId;
        this.start = start;
        this.end = end;
    }
}
exports.TimeSlotMergeCommand = TimeSlotMergeCommand;
//# sourceMappingURL=time-slot-merge.command.js.map
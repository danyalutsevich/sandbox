"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSlotBulkDeleteCommand = void 0;
class TimeSlotBulkDeleteCommand {
    input;
    forceDirectDelete;
    static type = '[TimeSlot] delete';
    constructor(input, forceDirectDelete = false) {
        this.input = input;
        this.forceDirectDelete = forceDirectDelete;
    }
}
exports.TimeSlotBulkDeleteCommand = TimeSlotBulkDeleteCommand;
//# sourceMappingURL=time-slot-bulk-delete.command.js.map
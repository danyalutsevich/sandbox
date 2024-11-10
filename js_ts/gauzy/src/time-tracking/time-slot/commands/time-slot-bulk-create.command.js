"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSlotBulkCreateCommand = void 0;
class TimeSlotBulkCreateCommand {
    slots;
    employeeId;
    organizationId;
    static type = '[TimeSlot] bulk create';
    constructor(slots, employeeId, organizationId) {
        this.slots = slots;
        this.employeeId = employeeId;
        this.organizationId = organizationId;
    }
}
exports.TimeSlotBulkCreateCommand = TimeSlotBulkCreateCommand;
//# sourceMappingURL=time-slot-bulk-create.command.js.map
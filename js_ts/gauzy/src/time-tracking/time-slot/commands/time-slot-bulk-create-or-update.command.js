"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSlotBulkCreateOrUpdateCommand = void 0;
class TimeSlotBulkCreateOrUpdateCommand {
    slots;
    employeeId;
    organizationId;
    static type = '[TimeSlot] bulk create / update';
    constructor(slots, employeeId, organizationId) {
        this.slots = slots;
        this.employeeId = employeeId;
        this.organizationId = organizationId;
    }
}
exports.TimeSlotBulkCreateOrUpdateCommand = TimeSlotBulkCreateOrUpdateCommand;
//# sourceMappingURL=time-slot-bulk-create-or-update.command.js.map
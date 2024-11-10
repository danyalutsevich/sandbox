"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTimeSlotCommand = void 0;
class UpdateTimeSlotCommand {
    id;
    input;
    static type = '[TimeSlot] update';
    constructor(id, input) {
        this.id = id;
        this.input = input;
    }
}
exports.UpdateTimeSlotCommand = UpdateTimeSlotCommand;
//# sourceMappingURL=update-time-slot.command.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTimeSlots = void 0;
const faker_1 = require("@faker-js/faker");
const time_slot_entity_1 = require("./time-slot.entity");
const utils_1 = require("./utils");
function createTimeSlots(start, end) {
    const timeSlots = (0, utils_1.generateTimeSlots)(start, end).map(({ duration, startedAt, stoppedAt }) => {
        const keyboard = faker_1.faker.number.int(duration);
        const mouse = faker_1.faker.number.int(duration);
        const overall = (keyboard + mouse) / 2;
        const slot = new time_slot_entity_1.TimeSlot();
        slot.startedAt = startedAt;
        slot.stoppedAt = stoppedAt;
        slot.duration = duration;
        slot.screenshots = [];
        slot.timeSlotMinutes = [];
        slot.keyboard = keyboard;
        slot.mouse = mouse;
        slot.overall = Math.ceil(overall);
        return slot;
    });
    return timeSlots;
}
exports.createTimeSlots = createTimeSlots;
//# sourceMappingURL=time-slot.seed.js.map
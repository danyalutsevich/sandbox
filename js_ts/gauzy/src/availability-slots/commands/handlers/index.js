"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const availability_slots_create_handler_1 = require("./availability-slots.create.handler");
const availability_slots_bulk_create_handler_1 = require("./availability-slots.bulk.create.handler");
const get_conflict_availability_slots_handler_1 = require("./get-conflict-availability-slots.handler");
exports.CommandHandlers = [
    availability_slots_create_handler_1.AvailabilitySlotsCreateHandler,
    availability_slots_bulk_create_handler_1.AvailabilitySlotsBulkCreateHandler,
    get_conflict_availability_slots_handler_1.GetConflictAvailabilitySlotsHandler
];
//# sourceMappingURL=index.js.map
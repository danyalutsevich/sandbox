"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const create_time_slot_handler_1 = require("./create-time-slot.handler");
const update_time_slot_handler_1 = require("./update-time-slot.handler");
const create_time_slot_minutes_handler_1 = require("./create-time-slot-minutes.handler");
const update_time_slot_minutes_handler_1 = require("./update-time-slot-minutes.handler");
const time_slot_bulk_create_or_update_handler_1 = require("./time-slot-bulk-create-or-update.handler");
const time_slot_bulk_create_handler_1 = require("./time-slot-bulk-create.handler");
const delete_time_slot_handler_1 = require("./delete-time-slot.handler");
const time_slot_bulk_delete_handler_1 = require("./time-slot-bulk-delete.handler");
const time_slot_merge_handler_1 = require("./time-slot-merge.handler");
const time_slot_create_handler_1 = require("./time-slot-create.handler");
const schedule_time_slot_entries_handler_1 = require("./schedule-time-slot-entries.handler");
exports.CommandHandlers = [
    create_time_slot_handler_1.CreateTimeSlotHandler,
    update_time_slot_handler_1.UpdateTimeSlotHandler,
    delete_time_slot_handler_1.DeleteTimeSlotHandler,
    time_slot_bulk_create_or_update_handler_1.TimeSlotBulkCreateOrUpdateHandler,
    time_slot_bulk_create_handler_1.TimeSlotBulkCreateHandler,
    create_time_slot_minutes_handler_1.CreateTimeSlotMinutesHandler,
    update_time_slot_minutes_handler_1.UpdateTimeSlotMinutesHandler,
    time_slot_bulk_delete_handler_1.TimeSlotBulkDeleteHandler,
    time_slot_merge_handler_1.TimeSlotMergeHandler,
    time_slot_create_handler_1.TimeSlotCreateHandler,
    schedule_time_slot_entries_handler_1.ScheduleTimeSlotEntriesHandler
];
//# sourceMappingURL=index.js.map
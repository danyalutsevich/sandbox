"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const activity_create_handler_1 = require("./activity-create.handler");
const activity_update_handler_1 = require("./activity-update.handler");
const bulk_activities_save_handler_1 = require("./bulk-activities-save.handler");
exports.CommandHandlers = [
    activity_create_handler_1.ActivityCreateHandler,
    activity_update_handler_1.ActivityUpdateHandler,
    bulk_activities_save_handler_1.BulkActivitiesSaveHandler
];
//# sourceMappingURL=index.js.map
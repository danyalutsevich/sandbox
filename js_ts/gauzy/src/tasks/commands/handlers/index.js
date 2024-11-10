"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const automation_task_sync_handler_1 = require("./automation-task.sync.handler");
const task_create_handler_1 = require("./task-create.handler");
const task_update_handler_1 = require("./task-update.handler");
exports.CommandHandlers = [
    automation_task_sync_handler_1.AutomationTaskSyncHandler,
    task_create_handler_1.TaskCreateHandler,
    task_update_handler_1.TaskUpdateHandler
];
//# sourceMappingURL=index.js.map
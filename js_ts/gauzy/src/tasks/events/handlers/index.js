"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandlers = void 0;
const task_created_handler_1 = require("./task-created.handler");
const task_updated_handler_1 = require("./task-updated.handler");
exports.EventHandlers = [
    task_created_handler_1.TaskCreatedEventHandler,
    task_updated_handler_1.TaskUpdatedEventHandler,
];
//# sourceMappingURL=index.js.map
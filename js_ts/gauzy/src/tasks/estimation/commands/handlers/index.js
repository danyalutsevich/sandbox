"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const task_estimation_create_handler_1 = require("./task-estimation-create.handler");
const task_estimation_update_handler_1 = require("./task-estimation-update.handler");
const task_estimation_delete_handler_1 = require("./task-estimation-delete.handler");
const task_estimation_calculate_handler_1 = require("./task-estimation-calculate.handler");
exports.CommandHandlers = [
    task_estimation_create_handler_1.TaskEstimationCreateHandler,
    task_estimation_update_handler_1.TaskEstimationUpdateHandler,
    task_estimation_delete_handler_1.TaskEstimationDeleteHandler,
    task_estimation_calculate_handler_1.TaskEstimationCalculateHandler,
];
//# sourceMappingURL=index.js.map
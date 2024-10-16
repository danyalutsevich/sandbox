"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskEstimationUpdateCommand = void 0;
class TaskEstimationUpdateCommand {
    id;
    input;
    static type = '[Task Estimation] Update Task Estimation';
    constructor(id, input) {
        this.id = id;
        this.input = input;
    }
}
exports.TaskEstimationUpdateCommand = TaskEstimationUpdateCommand;
//# sourceMappingURL=task-estimation-update.command.js.map
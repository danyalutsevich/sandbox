"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCreateCommand = void 0;
class TaskCreateCommand {
    input;
    triggeredEvent;
    static type = '[Tasks] Create Task';
    constructor(input, triggeredEvent = true // Enabled the "2 Way Sync Triggered Event" Synchronization
    ) {
        this.input = input;
        this.triggeredEvent = triggeredEvent;
    }
}
exports.TaskCreateCommand = TaskCreateCommand;
//# sourceMappingURL=task-create.command.js.map
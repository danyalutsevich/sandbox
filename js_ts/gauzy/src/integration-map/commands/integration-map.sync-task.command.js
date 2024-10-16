"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationMapSyncTaskCommand = void 0;
class IntegrationMapSyncTaskCommand {
    input;
    triggeredEvent;
    static type = '[Integration Map] Sync Task';
    constructor(input, triggeredEvent = true // Enabled the "2 Way Sync Triggered Event" Synchronization
    ) {
        this.input = input;
        this.triggeredEvent = triggeredEvent;
    }
}
exports.IntegrationMapSyncTaskCommand = IntegrationMapSyncTaskCommand;
//# sourceMappingURL=integration-map.sync-task.command.js.map
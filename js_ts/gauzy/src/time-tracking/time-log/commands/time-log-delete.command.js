"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeLogDeleteCommand = void 0;
class TimeLogDeleteCommand {
    ids;
    forceDelete;
    static type = '[TimeLog] delete';
    constructor(ids, forceDelete = false) {
        this.ids = ids;
        this.forceDelete = forceDelete;
    }
}
exports.TimeLogDeleteCommand = TimeLogDeleteCommand;
//# sourceMappingURL=time-log-delete.command.js.map
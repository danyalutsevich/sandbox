"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimesheetFirstOrCreateCommand = void 0;
class TimesheetFirstOrCreateCommand {
    date;
    employeeId;
    organizationId;
    static type = '[Timesheet] First Or Create';
    constructor(date, employeeId, organizationId) {
        this.date = date;
        this.employeeId = employeeId;
        this.organizationId = organizationId;
    }
}
exports.TimesheetFirstOrCreateCommand = TimesheetFirstOrCreateCommand;
//# sourceMappingURL=timesheet-first-or-create.command.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmployeeJobSearchStatusCommand = void 0;
class UpdateEmployeeJobSearchStatusCommand {
    employeeId;
    input;
    static type = '[Employee] Update Job Search Status';
    constructor(employeeId, input) {
        this.employeeId = employeeId;
        this.input = input;
    }
}
exports.UpdateEmployeeJobSearchStatusCommand = UpdateEmployeeJobSearchStatusCommand;
//# sourceMappingURL=update-employee-job-search-status.command.js.map
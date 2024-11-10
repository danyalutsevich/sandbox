"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmployeeTotalWorkedHoursCommand = void 0;
class UpdateEmployeeTotalWorkedHoursCommand {
    employeeId;
    hours;
    static type = '[Employee] Update Total Worked Hours';
    constructor(employeeId, hours) {
        this.employeeId = employeeId;
        this.hours = hours;
    }
}
exports.UpdateEmployeeTotalWorkedHoursCommand = UpdateEmployeeTotalWorkedHoursCommand;
//# sourceMappingURL=update-employee-total-worked-hours.command.js.map
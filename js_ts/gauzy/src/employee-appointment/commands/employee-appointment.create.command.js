"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeAppointmentCreateCommand = void 0;
class EmployeeAppointmentCreateCommand {
    employeeAppointmentInput;
    languageCode;
    static type = '[EmployeeAppointment] Register';
    constructor(employeeAppointmentInput, languageCode) {
        this.employeeAppointmentInput = employeeAppointmentInput;
        this.languageCode = languageCode;
    }
}
exports.EmployeeAppointmentCreateCommand = EmployeeAppointmentCreateCommand;
//# sourceMappingURL=employee-appointment.create.command.js.map
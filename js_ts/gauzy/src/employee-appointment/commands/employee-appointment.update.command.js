"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeAppointmentUpdateCommand = void 0;
class EmployeeAppointmentUpdateCommand {
    id;
    employeeAppointmentUpdateRequest;
    static type = '[EmployeeAppointment] Update';
    constructor(id, employeeAppointmentUpdateRequest) {
        this.id = id;
        this.employeeAppointmentUpdateRequest = employeeAppointmentUpdateRequest;
    }
}
exports.EmployeeAppointmentUpdateCommand = EmployeeAppointmentUpdateCommand;
//# sourceMappingURL=employee-appointment.update.command.js.map
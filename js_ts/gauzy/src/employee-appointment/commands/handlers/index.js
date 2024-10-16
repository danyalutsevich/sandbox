"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const employee_appointment_create_handler_1 = require("./employee-appointment.create.handler");
const employee_appointment_update_handler_1 = require("./employee-appointment.update.handler");
exports.CommandHandlers = [
    employee_appointment_create_handler_1.EmployeeAppointmentCreateHandler,
    employee_appointment_update_handler_1.EmployeeAppointmentUpdateHandler
];
//# sourceMappingURL=index.js.map
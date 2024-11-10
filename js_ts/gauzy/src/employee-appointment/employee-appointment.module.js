"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EmployeeAppointmentModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeAppointmentModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const employee_appointment_entity_1 = require("./employee-appointment.entity");
const employee_appointment_controller_1 = require("./employee-appointment.controller");
const employee_appointment_service_1 = require("./employee-appointment.service");
const handlers_1 = require("./commands/handlers");
const email_send_module_1 = require("email-send/email-send.module");
const employee_module_1 = require("../employee/employee.module");
const organization_module_1 = require("../organization/organization.module");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let EmployeeAppointmentModule = exports.EmployeeAppointmentModule = EmployeeAppointmentModule_1 = class EmployeeAppointmentModule {
};
exports.EmployeeAppointmentModule = EmployeeAppointmentModule = EmployeeAppointmentModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/employee-appointment', module: EmployeeAppointmentModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([employee_appointment_entity_1.EmployeeAppointment]),
            nestjs_1.MikroOrmModule.forFeature([employee_appointment_entity_1.EmployeeAppointment]),
            email_send_module_1.EmailSendModule,
            employee_module_1.EmployeeModule,
            organization_module_1.OrganizationModule,
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [employee_appointment_controller_1.EmployeeAppointmentController],
        providers: [employee_appointment_service_1.EmployeeAppointmentService, ...handlers_1.CommandHandlers],
        exports: [employee_appointment_service_1.EmployeeAppointmentService]
    })
], EmployeeAppointmentModule);
//# sourceMappingURL=employee-appointment.module.js.map
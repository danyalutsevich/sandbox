"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomEmployeeAppointment = exports.createDefaultEmployeeAppointment = void 0;
const faker_1 = require("@faker-js/faker");
const moment_1 = __importDefault(require("moment"));
const employee_appointment_entity_1 = require("./employee-appointment.entity");
const default_employee_appointment_1 = require("./default-employee-appointment");
const internal_1 = require("./../core/entities/internal");
const createDefaultEmployeeAppointment = async (dataSource, tenant, employees, organizations) => {
    if (!employees) {
        console.warn('Warning: Employees not found, Default Employee Appointment  will not be created');
        return;
    }
    if (!organizations) {
        console.warn('Warning: tenantOrganizations not found, Default Employee Appointment  will not be created');
        return;
    }
    let employeesAppointments = [];
    for (const employee of employees) {
        employeesAppointments = await dataOperation(dataSource, employeesAppointments, employee, [organizations], tenant);
    }
    await dataSource.manager.save(employeesAppointments);
};
exports.createDefaultEmployeeAppointment = createDefaultEmployeeAppointment;
const createRandomEmployeeAppointment = async (dataSource, tenants, tenantOrganizationsMap, organizationEmployeesMap) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, Employee Appointment  will not be created');
        return;
    }
    if (!organizationEmployeesMap) {
        console.warn('Warning: organizationEmployeesMap not found, Employee Appointment  will not be created');
        return;
    }
    let employeesAppointments = [];
    for await (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        for await (const organization of organizations) {
            const tenantEmployees = organizationEmployeesMap.get(organization);
            const tenantOrgs = tenantOrganizationsMap.get(tenant);
            for (const tenantEmployee of tenantEmployees) {
                employeesAppointments = await dataOperation(dataSource, employeesAppointments, tenantEmployee, tenantOrgs, tenant);
            }
        }
    }
};
exports.createRandomEmployeeAppointment = createRandomEmployeeAppointment;
const dataOperation = async (dataSource, employeesAppointments, tenantEmployee, organizations, tenant) => {
    for (const organization of organizations) {
        const employeesAppointment = new employee_appointment_entity_1.EmployeeAppointment();
        const invitees = await dataSource.manager.find(internal_1.AppointmentEmployee, {
            where: [{ employeeId: tenantEmployee.id }]
        });
        employeesAppointment.employee = tenantEmployee;
        employeesAppointment.organization = organization;
        employeesAppointment.description = faker_1.faker.person.jobDescriptor();
        employeesAppointment.location = faker_1.faker.location.city();
        employeesAppointment.startDateTime = faker_1.faker.date.between({
            from: new Date(),
            to: (0, moment_1.default)(new Date()).add(2, 'months').toDate()
        });
        employeesAppointment.endDateTime = (0, moment_1.default)(employeesAppointment.startDateTime)
            .add(1, 'hours')
            .toDate();
        employeesAppointment.invitees = invitees;
        employeesAppointment.agenda = faker_1.faker.helpers.arrayElement(default_employee_appointment_1.AGENDAS);
        employeesAppointment.tenant = tenant;
        employeesAppointments.push(employeesAppointment);
    }
    await dataSource.manager.save(employeesAppointments);
    return employeesAppointments;
};
//# sourceMappingURL=employee-appointment.seed.js.map
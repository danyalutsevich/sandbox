"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomAppointmentEmployees = void 0;
const appointment_employees_entity_1 = require("./appointment-employees.entity");
const faker_1 = require("@faker-js/faker");
const createRandomAppointmentEmployees = async (dataSource, tenants, tenantOrganizationsMap, organizationEmployeesMap) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, Appointment Employees  will not be created');
        return;
    }
    if (!organizationEmployeesMap) {
        console.warn('Warning: organizationEmployeesMap not found, Appointment Employees  will not be created');
        return;
    }
    const appointmentEmployees = [];
    for await (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        for await (const organization of organizations) {
            const tenantEmployees = organizationEmployeesMap.get(organization);
            for await (const tenantEmployee of tenantEmployees) {
                for (let i = 0; i < faker_1.faker.number.int(15); i++) {
                    const appointmentEmployee = new appointment_employees_entity_1.AppointmentEmployee();
                    //todo: need to verify appointmentId is used anywhere else or not
                    appointmentEmployee.appointmentId = faker_1.faker.number.int({ min: 100000, max: 1000000 }).toString();
                    appointmentEmployee.employeeId = tenantEmployee.id;
                    appointmentEmployee.organization = tenantEmployee.organization;
                    appointmentEmployee.tenant = tenant;
                    appointmentEmployees.push(appointmentEmployee);
                }
            }
        }
    }
    await dataSource.manager.save(appointmentEmployees);
};
exports.createRandomAppointmentEmployees = createRandomAppointmentEmployees;
//# sourceMappingURL=appointment-employees.seed.js.map
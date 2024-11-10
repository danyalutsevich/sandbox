"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomEmployeeSetting = void 0;
const faker_1 = require("@faker-js/faker");
const index_1 = require("../../plugins/config/dist/index");
4;
const employee_setting_entity_1 = require("./employee-setting.entity");
const createRandomEmployeeSetting = async (dataSource, tenants, tenantOrganizationsMap, organizationEmployeesMap) => {
    if (!organizationEmployeesMap) {
        console.warn('Warning: organizationEmployeesMap not found, Employee settings  will not be created');
        return;
    }
    const employees = [];
    const setting = ['Normal', 'Custom'];
    for await (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        for await (const organization of organizations) {
            const tenantEmployees = organizationEmployeesMap.get(organization);
            for await (const tenantEmployee of tenantEmployees) {
                const employee = new employee_setting_entity_1.EmployeeSetting();
                const startDate = faker_1.faker.date.past();
                employee.employeeId = tenantEmployee.id;
                employee.month = startDate.getMonth() + 1;
                employee.year = startDate.getFullYear();
                employee.settingType = setting[Math.random() > 0.5 ? 1 : 0];
                employee.value = Math.floor(Math.random() * 999) + 1;
                employee.currency = index_1.environment.defaultCurrency;
                employee.employee = tenantEmployee;
                employee.organization = faker_1.faker.helpers.arrayElement(organizations);
                employee.tenant = tenant;
                employees.push(employee);
            }
        }
    }
    await insertRandomEmployeeSetting(dataSource, employees);
    return employees;
};
exports.createRandomEmployeeSetting = createRandomEmployeeSetting;
const insertRandomEmployeeSetting = async (dataSource, Employees) => {
    await dataSource
        .createQueryBuilder()
        .insert()
        .into(employee_setting_entity_1.EmployeeSetting)
        .values(Employees)
        .execute();
};
//# sourceMappingURL=employee-setting.seed.js.map
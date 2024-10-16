"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultEmployeeAwards = void 0;
const employee_award_entity_1 = require("./employee-award.entity");
const default_employee_awards_1 = require("./default-employee-awards");
const createDefaultEmployeeAwards = async (dataSource, tenant, employee) => {
    const awards = default_employee_awards_1.DEFAULT_EMPLOYEE_AWARDS.map(({ name, year }) => {
        const award = new employee_award_entity_1.EmployeeAward();
        award.name = name;
        award.year = year;
        award.employee = employee;
        award.employeeId = employee.id;
        award.tenant = tenant;
        award.organization = employee.organization;
        return award;
    });
    return await dataSource.manager.save(awards);
};
exports.createDefaultEmployeeAwards = createDefaultEmployeeAwards;
//# sourceMappingURL=employee-award.seed.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployeeLevels = void 0;
const employee_level_entity_1 = require("./employee-level.entity");
const default_employee_levels_1 = require("./default-employee-levels");
const createEmployeeLevels = async (dataSource, tenant, organizations) => {
    const employeeLevels = [];
    default_employee_levels_1.DEFAULT_EMPLOYEE_LEVELS.forEach(({ level }) => {
        for (const organization of organizations) {
            const entity = new employee_level_entity_1.EmployeeLevel();
            entity.level = level;
            entity.organization = organization;
            entity.tenant = tenant;
            employeeLevels.push(entity);
        }
    });
    return insertLevels(dataSource, employeeLevels);
};
exports.createEmployeeLevels = createEmployeeLevels;
const insertLevels = async (dataSource, employeeLevels) => await dataSource.manager.save(employeeLevels);
//# sourceMappingURL=employee-level.seed.js.map
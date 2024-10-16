"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultGoalKpi = void 0;
const goal_kpi_entity_1 = require("./goal-kpi.entity");
const faker_1 = require("@faker-js/faker");
const default_goal_kpis_1 = require("./default-goal-kpis");
const createDefaultGoalKpi = async (dataSource, tenant, organizations, employees) => {
    const goalKpis = [];
    organizations.forEach((organization) => {
        default_goal_kpis_1.DEFAULT_GOAL_KPIS.forEach((goalKPI) => {
            const goalKpi = new goal_kpi_entity_1.GoalKPI();
            goalKpi.name = goalKPI.name;
            goalKpi.description = ' ';
            goalKpi.type = goalKPI.type;
            goalKpi.operator = goalKPI.operator;
            goalKpi.unit = goalKPI.unit;
            goalKpi.lead = faker_1.faker.helpers.arrayElement(employees);
            goalKpi.currentValue = goalKPI.currentValue;
            goalKpi.targetValue = goalKPI.targetValue;
            goalKpi.organization = organization;
            goalKpi.tenant = tenant;
            goalKpis.push(goalKpi);
        });
    });
    return await insertRandomGoalKpi(dataSource, goalKpis);
};
exports.createDefaultGoalKpi = createDefaultGoalKpi;
const insertRandomGoalKpi = async (dataSource, goalKpis) => {
    return await dataSource.manager.save(goalKpis);
};
//# sourceMappingURL=goal-kpi.seed.js.map
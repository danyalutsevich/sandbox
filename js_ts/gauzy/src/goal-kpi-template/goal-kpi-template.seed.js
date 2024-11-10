"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultGoalKpiTemplate = void 0;
const default_goal_kpi_templates_1 = require("./default-goal-kpi-templates");
const goal_kpi_template_entity_1 = require("./goal-kpi-template.entity");
const createDefaultGoalKpiTemplate = async (dataSource, tenant, organization) => {
    const goalKpiTemplates = [];
    default_goal_kpi_templates_1.DEFAULT_GOAL_KPI_TEMPLATES.forEach((item) => {
        const goalKpi = new goal_kpi_template_entity_1.GoalKPITemplate();
        goalKpi.name = item.name;
        goalKpi.description = '';
        goalKpi.type = item.type;
        goalKpi.operator = item.operator;
        goalKpi.unit = item.unit;
        goalKpi.currentValue = item.currentValue;
        goalKpi.targetValue = item.targetValue;
        goalKpi.organization = organization;
        goalKpi.tenant = tenant;
        goalKpiTemplates.push(goalKpi);
    });
    return await insertRandomGoalKpi(dataSource, goalKpiTemplates);
};
exports.createDefaultGoalKpiTemplate = createDefaultGoalKpiTemplate;
const insertRandomGoalKpi = async (dataSource, goalKpiTemplates) => {
    return await dataSource.manager.save(goalKpiTemplates);
};
//# sourceMappingURL=goal-kpi-template.seed.js.map
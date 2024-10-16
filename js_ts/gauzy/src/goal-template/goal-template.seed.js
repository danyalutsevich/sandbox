"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultGoalTemplates = void 0;
const goal_template_entity_1 = require("./goal-template.entity");
const default_goal_templates_1 = require("./default-goal-templates");
const createDefaultGoalTemplates = async (dataSource, tenant, organization) => {
    const defaultGoalTemplates = [];
    default_goal_templates_1.DEFAULT_GOAL_TEMPLATES.forEach((goalData) => {
        const goalTemplate = new goal_template_entity_1.GoalTemplate();
        goalTemplate.name = goalData.name;
        goalTemplate.level = goalData.level;
        goalTemplate.category = goalData.category;
        goalTemplate.tenant = tenant;
        goalTemplate.organization = organization;
        defaultGoalTemplates.push(goalTemplate);
    });
    return await insertDefaultGoalTemplates(dataSource, defaultGoalTemplates);
};
exports.createDefaultGoalTemplates = createDefaultGoalTemplates;
const insertDefaultGoalTemplates = async (dataSource, defaultGoalTemplates) => {
    return await dataSource.manager.save(defaultGoalTemplates);
};
//# sourceMappingURL=goal-template.seed.js.map
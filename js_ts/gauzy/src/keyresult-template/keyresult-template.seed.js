"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultKeyResultTemplates = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const keyresult_template_entity_1 = require("./keyresult-template.entity");
const goal_template_entity_1 = require("../goal-template/goal-template.entity");
const goal_kpi_template_entity_1 = require("../goal-kpi-template/goal-kpi-template.entity");
const faker_1 = require("@faker-js/faker");
const default_keyresult_templates_1 = require("./default-keyresult-templates");
const createDefaultKeyResultTemplates = async (dataSource, tenant) => {
    const defaultKeyResultTemplates = [];
    const goalTemplates = await dataSource.manager.find(goal_template_entity_1.GoalTemplate);
    const goalKPITemplates = await dataSource.manager.find(goal_kpi_template_entity_1.GoalKPITemplate);
    if (goalTemplates && goalTemplates.length > 0) {
        goalTemplates.forEach((goal) => {
            const keyResultsOfGoal = default_keyresult_templates_1.DEFAULT_KEY_RESULT_TEMPLATES.find((goalData) => goalData.name === goal.name);
            keyResultsOfGoal.keyResults.forEach(async (keyResultData) => {
                const keyResult = new keyresult_template_entity_1.KeyResultTemplate();
                keyResult.type = keyResultData.type;
                if (keyResult.type === index_1.KeyResultTypeEnum.TRUE_OR_FALSE) {
                    keyResult.initialValue = 0;
                    keyResult.targetValue = 1;
                }
                else {
                    if (keyResult.type === index_1.KeyResultTypeEnum.KPI) {
                        keyResult.kpi = faker_1.faker.helpers.arrayElement(goalKPITemplates);
                    }
                    keyResult.initialValue = keyResultData.initialValue;
                    keyResult.targetValue = keyResultData.targetValue;
                }
                keyResult.unit = keyResultData.unit;
                keyResult.name = keyResultData.name;
                keyResult.deadline = keyResultData.deadline;
                keyResult.goal = goal;
                keyResult.organizationId = goal.organizationId;
                keyResult.tenant = tenant;
                defaultKeyResultTemplates.push(keyResult);
            });
        });
        return await insertDefaultKeyResults(dataSource, defaultKeyResultTemplates);
    }
};
exports.createDefaultKeyResultTemplates = createDefaultKeyResultTemplates;
const insertDefaultKeyResults = async (dataSource, defaultKeyResults) => {
    return await dataSource.manager.save(defaultKeyResults);
};
//# sourceMappingURL=keyresult-template.seed.js.map
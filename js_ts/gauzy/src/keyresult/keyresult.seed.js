"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomKeyResult = exports.updateDefaultKeyResultProgress = exports.createDefaultKeyResults = void 0;
const faker_1 = require("@faker-js/faker");
const keyresult_entity_1 = require("./keyresult.entity");
const index_1 = require("../../plugins/contracts/dist/index");
const date_fns_1 = require("date-fns");
const moment_1 = __importDefault(require("moment"));
const goal_kpi_entity_1 = require("../goal-kpi/goal-kpi.entity");
const default_keyresults_1 = require("./default-keyresults");
const createDefaultKeyResults = async (dataSource, tenant, employees, goals) => {
    const defaultKeyResults = [];
    const goalKPIs = await dataSource.manager.find(goal_kpi_entity_1.GoalKPI);
    if (goals && goals.length > 0) {
        goals.forEach((goal) => {
            const keyResultsOfGoal = default_keyresults_1.DEFAULT_KEY_RESULTS.find((goalData) => goalData.name === goal.name);
            keyResultsOfGoal.keyResults.forEach((keyResultData) => {
                const keyResult = new keyresult_entity_1.KeyResult();
                keyResult.deadline = keyResultData.deadline;
                if (keyResult.deadline !==
                    index_1.KeyResultDeadlineEnum.NO_CUSTOM_DEADLINE) {
                    keyResult.hardDeadline = keyResultData.hardDeadline;
                    keyResult.softDeadline = null;
                    if (keyResult.deadline ===
                        index_1.KeyResultDeadlineEnum.HARD_AND_SOFT_DEADLINE) {
                        keyResult.softDeadline = keyResultData.softDeadline;
                    }
                }
                else {
                    keyResult.hardDeadline = null;
                    keyResult.softDeadline = null;
                }
                keyResult.owner = faker_1.faker.helpers.arrayElement(employees);
                keyResult.lead = faker_1.faker.helpers.arrayElement(employees);
                keyResult.type = keyResultData.type;
                if (keyResult.type === index_1.KeyResultTypeEnum.TRUE_OR_FALSE) {
                    keyResult.initialValue = 0;
                    keyResult.targetValue = 1;
                }
                else {
                    if (keyResultData.type === index_1.KeyResultTypeEnum.KPI) {
                        keyResult.kpi = faker_1.faker.helpers.arrayElement(goalKPIs);
                    }
                    keyResult.initialValue = keyResultData.initialValue;
                    keyResult.targetValue = keyResultData.targetValue;
                }
                keyResult.unit = keyResultData.unit;
                keyResult.progress = 0;
                keyResult.name = keyResultData.name;
                keyResult.goal = goal;
                keyResult.organizationId = goal.organizationId;
                keyResult.tenant = tenant;
                keyResult.update = keyResult.initialValue;
                keyResult.status = 'none';
                keyResult.description = ' ';
                keyResult.weight = faker_1.faker.helpers.arrayElement([
                    index_1.KeyResultWeightEnum.DEFAULT,
                    index_1.KeyResultWeightEnum.INCREASE_BY_2X,
                    index_1.KeyResultWeightEnum.INCREASE_BY_4X
                ]);
                defaultKeyResults.push(keyResult);
            });
        });
        await insertDefaultKeyResults(dataSource, defaultKeyResults);
        return defaultKeyResults;
    }
};
exports.createDefaultKeyResults = createDefaultKeyResults;
const updateDefaultKeyResultProgress = async (dataSource) => {
    const keyResults = await dataSource.manager.find(keyresult_entity_1.KeyResult, {
        relations: ['updates']
    });
    keyResults.forEach(async (keyResult) => {
        const sortedUpdates = [...keyResult.updates].sort((a, b) => {
            return (0, date_fns_1.compareAsc)(new Date(a.createdAt), new Date(b.createdAt));
        });
        const recentUpdate = sortedUpdates[sortedUpdates.length - 1];
        if (recentUpdate) {
            await dataSource.manager.update(keyresult_entity_1.KeyResult, { id: keyResult.id }, {
                progress: recentUpdate.progress,
                update: recentUpdate.update
            });
        }
    });
    return keyResults;
};
exports.updateDefaultKeyResultProgress = updateDefaultKeyResultProgress;
const insertDefaultKeyResults = async (dataSource, defaultKeyResults) => {
    await dataSource
        .createQueryBuilder()
        .insert()
        .into(keyresult_entity_1.KeyResult)
        .values(defaultKeyResults)
        .execute();
};
const createRandomKeyResult = async (dataSource, tenants, goals, tenantOrganizationsMap, organizationEmployeesMap) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, Random KeyResult will not be created');
        return;
    }
    if (!organizationEmployeesMap) {
        console.warn('Warning: organizationEmployeesMap not found, Random KeyResult will not be created');
        return;
    }
    const keyResults = [];
    for (const tenant of tenants) {
        const tenantOrgs = tenantOrganizationsMap.get(tenant);
        for await (const organization of tenantOrgs) {
            const organizationEmployees = organizationEmployeesMap.get(organization);
            for (const goal of goals) {
                const keyResult = new keyresult_entity_1.KeyResult();
                keyResult.deadline = faker_1.faker.helpers.arrayElement(Object.keys(index_1.KeyResultDeadlineEnum));
                if (keyResult.deadline !== index_1.KeyResultDeadlineEnum.NO_CUSTOM_DEADLINE) {
                    keyResult.hardDeadline = (0, moment_1.default)(new Date())
                        .add(1, 'days')
                        .toDate();
                    keyResult.softDeadline = null;
                    if (keyResult.deadline ===
                        index_1.KeyResultDeadlineEnum.HARD_AND_SOFT_DEADLINE) {
                        keyResult.softDeadline = (0, moment_1.default)(new Date())
                            .add(3, 'days')
                            .toDate();
                    }
                }
                else {
                    keyResult.hardDeadline = null;
                    keyResult.softDeadline = null;
                }
                keyResult.owner = faker_1.faker.helpers.arrayElement(organizationEmployees);
                keyResult.lead = faker_1.faker.helpers.arrayElement(organizationEmployees);
                keyResult.type = faker_1.faker.helpers.arrayElement(Object.keys(index_1.KeyResultTypeEnum));
                if (keyResult.type === index_1.KeyResultTypeEnum.TRUE_OR_FALSE) {
                    keyResult.initialValue = 0;
                    keyResult.targetValue = 1;
                }
                else {
                    keyResult.targetValue = faker_1.faker.number.int(5000);
                    keyResult.initialValue = faker_1.faker.number.int(keyResult.targetValue);
                }
                keyResult.unit = faker_1.faker.helpers.arrayElement([
                    'signups',
                    'publications',
                    'interviews',
                    'people',
                    '%'
                ]);
                keyResult.progress = 0;
                keyResult.name = faker_1.faker.person.jobTitle();
                keyResult.goal = goal;
                keyResult.organizationId = goal.organizationId;
                keyResult.tenant = tenant;
                keyResult.update = keyResult.initialValue;
                keyResult.status = 'none';
                keyResult.description = ' ';
                keyResult.weight = faker_1.faker.helpers.arrayElement([
                    index_1.KeyResultWeightEnum.DEFAULT,
                    index_1.KeyResultWeightEnum.INCREASE_BY_2X,
                    index_1.KeyResultWeightEnum.INCREASE_BY_4X
                ]);
                keyResults.push(keyResult);
            }
        }
    }
    await dataSource.manager.save(keyResults);
};
exports.createRandomKeyResult = createRandomKeyResult;
//# sourceMappingURL=keyresult.seed.js.map
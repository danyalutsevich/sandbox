"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomGoal = exports.updateDefaultGoalProgress = exports.createDefaultGoals = void 0;
const goal_entity_1 = require("./goal.entity");
const faker_1 = require("@faker-js/faker");
const goal_time_frame_entity_1 = require("../goal-time-frame/goal-time-frame.entity");
const index_1 = require("../../plugins/contracts/dist/index");
const organization_team_entity_1 = require("../organization-team/organization-team.entity");
const default_goals_1 = require("./default-goals");
const createDefaultGoals = async (dataSource, tenant, organizations, employees) => {
    const defaultGoals = [];
    const goalTimeFrames = await dataSource.manager.find(goal_time_frame_entity_1.GoalTimeFrame);
    const orgTeams = await dataSource.manager.find(organization_team_entity_1.OrganizationTeam);
    for await (const organization of organizations) {
        default_goals_1.DEFAULT_GOALS.forEach((goalData) => {
            const goal = new goal_entity_1.Goal();
            goal.name = goalData.name;
            goal.progress = 0;
            goal.level = goalData.level;
            if (goal.level === index_1.GoalLevelEnum.EMPLOYEE) {
                goal.ownerEmployee = faker_1.faker.helpers.arrayElement(employees);
            }
            else if (goal.level === index_1.GoalLevelEnum.TEAM) {
                goal.ownerTeam = faker_1.faker.helpers.arrayElement(orgTeams);
            }
            goal.lead = faker_1.faker.helpers.arrayElement(employees);
            goal.description = faker_1.faker.person.jobDescriptor();
            goal.deadline = faker_1.faker.helpers.arrayElement(goalTimeFrames).name;
            goal.tenant = tenant;
            goal.organization = organization;
            defaultGoals.push(goal);
        });
    }
    await insertDefaultGoals(dataSource, defaultGoals);
    return defaultGoals;
};
exports.createDefaultGoals = createDefaultGoals;
const updateDefaultGoalProgress = async (dataSource) => {
    const goals = await dataSource.manager.find(goal_entity_1.Goal, {
        relations: ['keyResults']
    });
    if (goals && goals.length > 0) {
        goals.forEach(async (goal) => {
            if (goal.keyResults && goal.keyResults.length > 0) {
                const progressTotal = goal.keyResults.reduce((a, b) => a + b.progress * +b.weight, 0);
                const weightTotal = goal.keyResults.reduce((a, b) => a + +b.weight, 0);
                const goalProgress = Math.round(progressTotal / weightTotal);
                await dataSource.manager.update(goal_entity_1.Goal, { id: goal.id }, {
                    progress: goalProgress
                });
            }
        });
        return goals;
    }
};
exports.updateDefaultGoalProgress = updateDefaultGoalProgress;
const insertDefaultGoals = async (dataSource, defaultGoals) => {
    await dataSource
        .createQueryBuilder()
        .insert()
        .into(goal_entity_1.Goal)
        .values(defaultGoals)
        .execute();
};
const createRandomGoal = async (dataSource, tenants, tenantOrganizationsMap, organizationEmployeesMap) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, Random Goal will not be created');
        return;
    }
    if (!organizationEmployeesMap) {
        console.warn('Warning: organizationEmployeesMap not found, Random Goal will not be created');
        return;
    }
    const goalTimeFrames = await dataSource.manager.find(goal_time_frame_entity_1.GoalTimeFrame);
    const goals = [];
    for await (const tenant of tenants) {
        const tenantOrgs = tenantOrganizationsMap.get(tenant);
        for await (const organization of tenantOrgs) {
            const tenantEmployees = organizationEmployeesMap.get(organization);
            const organizationTeams = await dataSource.manager.find(organization_team_entity_1.OrganizationTeam, {
                where: [
                    { organizationId: organization.id }
                ]
            });
            const goal = new goal_entity_1.Goal();
            goal.name = faker_1.faker.person.jobTitle();
            goal.progress = 0;
            goal.level = faker_1.faker.helpers.arrayElement(Object.values(index_1.GoalLevelEnum));
            if (goal.level === index_1.GoalLevelEnum.EMPLOYEE) {
                goal.ownerEmployee = faker_1.faker.helpers.arrayElement(tenantEmployees);
            }
            else if (goal.level === index_1.GoalLevelEnum.TEAM) {
                goal.ownerTeam = faker_1.faker.helpers.arrayElement(organizationTeams);
            }
            goal.lead = faker_1.faker.helpers.arrayElement(tenantEmployees);
            goal.description = faker_1.faker.person.jobDescriptor();
            goal.deadline = faker_1.faker.helpers.arrayElement(goalTimeFrames).name;
            goal.tenant = tenant;
            goal.organization = organization;
            goals.push(goal);
        }
    }
    await dataSource.manager.save(goals);
    return goals;
};
exports.createRandomGoal = createRandomGoal;
//# sourceMappingURL=goal.seed.js.map
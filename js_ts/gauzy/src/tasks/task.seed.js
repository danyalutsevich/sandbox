"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaxTaskNumberByProject = exports.createTags = exports.createRandomTask = exports.createDefaultTask = void 0;
const typeorm_1 = require("typeorm");
const faker_1 = require("@faker-js/faker");
const underscore_1 = require("underscore");
const rxjs_1 = require("rxjs");
const index_1 = require("../../plugins/common/dist/index");
const axios_1 = require("@nestjs/axios");
const index_2 = require("../../plugins/plugins/integration-github/dist/index");
const internal_1 = require("./../core/entities/internal");
const database_helper_1 = require("./../database/database.helper");
const createDefaultTask = async (dataSource, tenant, organization) => {
    const httpService = new axios_1.HttpService();
    console.log(`${index_2.GITHUB_API_URL}/repos/ever-co/ever-gauzy/issues`);
    const issues$ = httpService
        .get(`${index_2.GITHUB_API_URL}/repos/ever-co/ever-gauzy/issues`)
        .pipe((0, rxjs_1.map)((response) => response.data));
    const issues = await (0, rxjs_1.lastValueFrom)(issues$);
    console.log(`Done ${index_2.GITHUB_API_URL}/repos/ever-co/ever-gauzy/issues`);
    let labels = [];
    issues.forEach(async (issue) => {
        labels = labels.concat(issue.labels);
    });
    labels = (0, underscore_1.uniq)(labels, (label) => label.name);
    const tags = await createTags(dataSource, labels, tenant, organization);
    const defaultProjects = await dataSource.manager.find(internal_1.OrganizationProject);
    if (!defaultProjects) {
        console.warn('Warning: projects not found, DefaultTasks will not be created');
        return;
    }
    const teams = await dataSource.manager.find(internal_1.OrganizationTeam);
    const users = await dataSource.manager.find(internal_1.User);
    const employees = await dataSource.manager.find(internal_1.Employee);
    let count = 0;
    for await (const issue of issues) {
        const project = faker_1.faker.helpers.arrayElement(defaultProjects);
        const maxTaskNumber = await getMaxTaskNumberByProject(dataSource, {
            tenantId: tenant.id,
            organizationId: organization.id,
            projectId: project.id,
        });
        const task = new internal_1.Task();
        task.tags = (0, underscore_1.filter)(tags, (tag) => !!issue.labels.find((label) => label.name === tag.name));
        task.tenant = tenant;
        task.organization = organization;
        task.title = issue.title;
        task.description = issue.body;
        task.status = issue.state;
        task.estimate = null;
        task.dueDate = faker_1.faker.date.future({ years: 0.3 });
        task.project = project;
        task.prefix = project.name.substring(0, 3);
        task.number = maxTaskNumber + 1;
        task.creator = faker_1.faker.helpers.arrayElement(users);
        if (count % 2 === 0) {
            task.members = faker_1.faker.helpers.arrayElements(employees, 5);
        }
        else {
            task.teams = [faker_1.faker.helpers.arrayElement(teams)];
        }
        await dataSource.manager.save(task);
        count++;
    }
};
exports.createDefaultTask = createDefaultTask;
const createRandomTask = async (dataSource, tenants) => {
    const httpService = new axios_1.HttpService();
    console.log(`${index_2.GITHUB_API_URL}/repos/ever-co/ever-gauzy/issues`);
    const issues$ = httpService
        .get(`${index_2.GITHUB_API_URL}/repos/ever-co/ever-gauzy/issues`)
        .pipe((0, rxjs_1.map)((response) => response.data));
    const issues = await (0, rxjs_1.lastValueFrom)(issues$);
    console.log(`Done ${index_2.GITHUB_API_URL}/repos/ever-co/ever-gauzy/issues`);
    let labels = [];
    issues.forEach(async (issue) => {
        labels = labels.concat(issue.labels);
    });
    labels = (0, underscore_1.uniq)(labels, (label) => label.name);
    for await (const tenant of tenants || []) {
        const { id: tenantId } = tenant;
        const users = await dataSource.manager.find(internal_1.User, {
            where: {
                tenantId,
            },
        });
        const organizations = await dataSource.manager.find(internal_1.Organization, {
            where: {
                tenantId,
            },
        });
        for await (const organization of organizations) {
            const { id: organizationId } = organization;
            const projects = await dataSource.manager.findBy(internal_1.OrganizationProject, {
                tenantId,
                organizationId,
            });
            if (!projects) {
                console.warn('Warning: projects not found, RandomTasks will not be created');
                continue;
            }
            const teams = await dataSource.manager.findBy(internal_1.OrganizationTeam, {
                tenantId,
                organizationId,
            });
            const tags = await createTags(dataSource, labels, tenant, organization);
            const employees = await dataSource.manager.findBy(internal_1.Employee, {
                tenantId,
                organizationId,
            });
            let count = 0;
            for await (const issue of issues) {
                const project = faker_1.faker.helpers.arrayElement(projects);
                const maxTaskNumber = await getMaxTaskNumberByProject(dataSource, {
                    tenantId: tenant.id,
                    organizationId: organization.id,
                    projectId: project.id,
                });
                const task = new internal_1.Task();
                task.tags = (0, underscore_1.filter)(tags, (tag) => !!issue.labels.find((label) => label.name === tag.name));
                task.title = issue.title;
                task.description = issue.body;
                task.status = issue.state;
                task.estimate = null;
                task.dueDate = null;
                task.project = project;
                task.prefix = project.name.substring(0, 3);
                task.number = maxTaskNumber + 1;
                task.teams = [faker_1.faker.helpers.arrayElement(teams)];
                task.creator = faker_1.faker.helpers.arrayElement(users);
                task.organization = organization;
                task.tenant = tenant;
                if (count % 2 === 0) {
                    task.members = faker_1.faker.helpers.arrayElements(employees, 5);
                }
                else {
                    task.teams = [faker_1.faker.helpers.arrayElement(teams)];
                }
                await dataSource.manager.save(task);
                count++;
            }
        }
    }
};
exports.createRandomTask = createRandomTask;
async function createTags(dataSource, labels, tenant, organization) {
    if (labels.length === 0) {
        return [];
    }
    const tags = labels.map((label) => new internal_1.Tag({
        name: label.name,
        description: label.description,
        color: `#${label.color}`,
        tenant,
        organization,
    }));
    const insertedTags = await dataSource.getRepository(internal_1.Tag).save(tags);
    return insertedTags;
}
exports.createTags = createTags;
/**
 * GET maximum task number by project filter
 *
 * @param options
 */
async function getMaxTaskNumberByProject(dataSource, options) {
    const { tenantId, organizationId, projectId } = options;
    /**
     * GET maximum task number by project
     */
    const query = dataSource.createQueryBuilder(internal_1.Task, 'task');
    // Build the query to get the maximum task number
    query.select((0, database_helper_1.prepareSQLQuery)(`COALESCE(MAX("${query.alias}"."number"), 0)`), 'maxTaskNumber');
    query.andWhere(new typeorm_1.Brackets((qb) => {
        qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" =:organizationId`), { organizationId });
        qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" =:tenantId`), { tenantId });
        if ((0, index_1.isNotEmpty)(projectId)) {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."projectId" = :projectId`), { projectId });
        }
        else {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."projectId" IS NULL`));
        }
    }));
    const { maxTaskNumber } = await query.getRawOne();
    return maxTaskNumber;
}
exports.getMaxTaskNumberByProject = getMaxTaskNumberByProject;
//# sourceMappingURL=task.seed.js.map
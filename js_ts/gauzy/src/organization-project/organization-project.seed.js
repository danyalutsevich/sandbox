"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProjectMembersCount = exports.assignOrganizationProjectToEmployee = exports.createRandomOrganizationProjects = exports.createDefaultOrganizationProjects = void 0;
const faker_1 = require("@faker-js/faker");
const underscore_1 = require("underscore");
const organization_project_entity_1 = require("./organization-project.entity");
const index_1 = require("../../plugins/contracts/dist/index");
const default_organization_projects_1 = require("./default-organization-projects");
const internal_1 = require("./../core/entities/internal");
const database_helper_1 = require("./../database/database.helper");
const createDefaultOrganizationProjects = async (dataSource, tenant, organization) => {
    const { id: tenantId } = tenant;
    const { id: organizationId } = organization;
    const tag = await dataSource.getRepository(internal_1.Tag).save({
        name: 'Web',
        description: '',
        color: faker_1.faker.color.human()
    });
    const projects = [];
    for (let index = 0; index < default_organization_projects_1.DEFAULT_ORGANIZATION_PROJECTS.length; index++) {
        const name = default_organization_projects_1.DEFAULT_ORGANIZATION_PROJECTS[index];
        const organizationContacts = await dataSource.manager.findBy(internal_1.OrganizationContact, {
            tenantId,
            organizationId
        });
        const project = new organization_project_entity_1.OrganizationProject();
        project.tags = [tag];
        project.name = name;
        project.organizationContact = faker_1.faker.helpers.arrayElement(organizationContacts);
        project.organization = organization;
        project.tenant = tenant;
        project.budgetType = faker_1.faker.helpers.arrayElement(Object.values(index_1.OrganizationProjectBudgetTypeEnum));
        project.budget =
            project.budgetType == index_1.OrganizationProjectBudgetTypeEnum.COST
                ? faker_1.faker.number.int({ min: 500, max: 5000 })
                : faker_1.faker.number.int({ min: 40, max: 400 });
        project.taskListType = faker_1.faker.helpers.arrayElement(Object.values(index_1.TaskListTypeEnum));
        // TODO: this seed creates default projects without tenantId.
        projects.push(project);
    }
    await dataSource.manager.save(projects);
    /**
    * Seeder for assign organization project to the employee of the specific organization
    */
    await (0, exports.assignOrganizationProjectToEmployee)(dataSource, tenant, organization);
    /**
    * Seeder for update project member count for specific tenant
    */
    await seedProjectMembersCount(dataSource, [tenant]);
    return projects;
};
exports.createDefaultOrganizationProjects = createDefaultOrganizationProjects;
const createRandomOrganizationProjects = async (dataSource, tenants, tenantOrganizationsMap, tags, maxProjectsPerOrganization) => {
    if (!tags) {
        console.warn('Warning: tags not found, RandomOrganizationProjects will not be created');
        return;
    }
    for await (const tenant of tenants) {
        const { id: tenantId } = tenant;
        const projectsPerOrganization = Math.floor(Math.random() * (maxProjectsPerOrganization - 5)) + 5;
        const organizations = tenantOrganizationsMap.get(tenant);
        for await (const organization of organizations) {
            const { id: organizationId } = organization;
            const organizationContacts = await dataSource.manager.findBy(internal_1.OrganizationContact, {
                tenantId,
                organizationId
            });
            const organizationContact = faker_1.faker.helpers.arrayElement(organizationContacts);
            const projects = [];
            for (let i = 0; i < projectsPerOrganization; i++) {
                const project = new organization_project_entity_1.OrganizationProject();
                project.tags = [tags[Math.floor(Math.random() * tags.length)]];
                project.name = faker_1.faker.company.name();
                project.organizationContact = organizationContact;
                project.organization = organization;
                project.tenant = tenant;
                project.budgetType = faker_1.faker.helpers.arrayElement(Object.values(index_1.OrganizationProjectBudgetTypeEnum));
                if (project.budgetType === index_1.OrganizationProjectBudgetTypeEnum.COST) {
                    // Set budget for COST type
                    project.budget = faker_1.faker.number.int({ min: 500, max: 5000 });
                }
                else {
                    // Set budget for other types
                    project.budget = faker_1.faker.number.int({ min: 40, max: 400 });
                }
                project.startDate = faker_1.faker.date.past({ years: 5 });
                // Generate endDate as a date in the future
                faker_1.faker.date.between({ from: project.startDate, to: new Date() });
                projects.push(project);
            }
            await dataSource.manager.save(projects);
            /**
            * Seeder for assign organization project to the employee of the specific organization
            */
            await (0, exports.assignOrganizationProjectToEmployee)(dataSource, tenant, organization);
        }
        /**
        * Seeder for update project member count for specific tenant
        */
        await seedProjectMembersCount(dataSource, [tenant]);
    }
};
exports.createRandomOrganizationProjects = createRandomOrganizationProjects;
/*
* Assign Organization Project To Respective Employees
*/
const assignOrganizationProjectToEmployee = async (dataSource, tenant, organization) => {
    const { id: tenantId } = tenant;
    const { id: organizationId } = organization;
    const organizationProjects = await dataSource.manager.findBy(organization_project_entity_1.OrganizationProject, {
        tenantId,
        organizationId
    });
    const employees = await dataSource.manager.findBy(internal_1.Employee, {
        tenantId,
        organizationId
    });
    for await (const employee of employees) {
        employee.projects = (0, underscore_1.chain)(organizationProjects)
            .shuffle()
            .take(faker_1.faker.number.int({ min: 2, max: 4 }))
            .unique()
            .values()
            .value();
    }
    await dataSource.manager.save(employees);
};
exports.assignOrganizationProjectToEmployee = assignOrganizationProjectToEmployee;
async function seedProjectMembersCount(dataSource, tenants) {
    const isSqliteOrMysql = ['sqlite', 'better-sqlite3', 'mysql'].includes(dataSource.options.type);
    /**
     * GET all tenants in the system
     */
    for await (const tenant of tenants) {
        const tenantId = tenant.id;
        /**
         * GET all tenant projects for specific tenant
         */
        const projects = await dataSource.manager.query((0, database_helper_1.prepareSQLQuery)(`SELECT * FROM "organization_project" WHERE "organization_project"."tenantId" = ${isSqliteOrMysql ? '?' : '$1'}`), [tenantId]);
        for await (const project of projects) {
            const projectId = project.id;
            /**
             * GET member counts for organization project
             */
            const [members] = await dataSource.manager.query((0, database_helper_1.prepareSQLQuery)(`
				SELECT
					COUNT("organization_project_employee"."employeeId") AS count
				FROM "organization_project_employee"
				INNER JOIN
					"employee" ON "employee"."id"="organization_project_employee"."employeeId"
				INNER JOIN
					"organization_project" ON "organization_project"."id"="organization_project_employee"."organizationProjectId"
				WHERE
					"organization_project_employee"."organizationProjectId" = ${isSqliteOrMysql ? '?' : '$1'}
			`), [projectId]);
            const count = members['count'];
            await dataSource.manager.query((0, database_helper_1.prepareSQLQuery)(`UPDATE "organization_project" SET "membersCount" = ${isSqliteOrMysql ? '?' : '$1'} WHERE "id" = ${isSqliteOrMysql ? '?' : '$2'}`), [count, projectId]);
        }
    }
}
exports.seedProjectMembersCount = seedProjectMembersCount;
//# sourceMappingURL=organization-project.seed.js.map
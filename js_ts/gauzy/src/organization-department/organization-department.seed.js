"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRandomOrganizationDepartments = exports.createDefaultOrganizationDepartments = void 0;
const organization_department_entity_1 = require("./organization-department.entity");
const faker_1 = require("@faker-js/faker");
const tag_entity_1 = require("../tags/tag.entity");
const default_organization_departments_1 = require("./default-organization-departments");
const createDefaultOrganizationDepartments = async (dataSource, tenant, organizations) => {
    const tag = dataSource.getRepository(tag_entity_1.Tag).create({
        name: 'API',
        description: '',
        color: faker_1.faker.color.human()
    });
    const departments = [];
    for (const organization of organizations) {
        default_organization_departments_1.DEFAULT_ORGANIZATION_DEPARTMENTS.forEach((name) => {
            const department = new organization_department_entity_1.OrganizationDepartment();
            department.tags = [tag];
            department.name = name;
            department.organization = organization;
            department.tenant = tenant;
            departments.push(department);
        });
    }
    return await dataSource.manager.save(departments);
};
exports.createDefaultOrganizationDepartments = createDefaultOrganizationDepartments;
const seedRandomOrganizationDepartments = async (dataSource, tenants, tenantOrganizationsMap) => {
    let departments = [];
    for (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        organizations.forEach(({ id: organizationId }) => {
            const organizationDepartments = default_organization_departments_1.DEFAULT_ORGANIZATION_DEPARTMENTS.map((name) => {
                const employmentDepartment = new organization_department_entity_1.OrganizationDepartment();
                employmentDepartment.name = name;
                employmentDepartment.organizationId = organizationId;
                employmentDepartment.tenant = tenant;
                return employmentDepartment;
            });
            departments = [...departments, ...organizationDepartments];
        });
        await insertEmploymentDepartment(dataSource, departments);
    }
};
exports.seedRandomOrganizationDepartments = seedRandomOrganizationDepartments;
const insertEmploymentDepartment = async (dataSource, employmentDepartment) => {
    await dataSource.manager.save(employmentDepartment);
};
//# sourceMappingURL=organization-department.seed.js.map
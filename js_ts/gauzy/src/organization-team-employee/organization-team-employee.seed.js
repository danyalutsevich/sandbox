"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomOrganizationTeamEmployee = void 0;
const faker_1 = require("@faker-js/faker");
const organization_team_employee_entity_1 = require("./organization-team-employee.entity");
const internal_1 = require("./../core/entities/internal");
const createRandomOrganizationTeamEmployee = async (dataSource, tenants, tenantOrganizationsMap, organizationEmployeesMap) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, Random Organization Team Employee will not be created');
        return;
    }
    if (!organizationEmployeesMap) {
        console.warn('Warning: organizationEmployeesMap not found, Random Organization Team Employee will not be created');
        return;
    }
    const orgTeamEmployees = [];
    for (const tenant of tenants) {
        const { id: tenantId } = tenant;
        const organizations = tenantOrganizationsMap.get(tenant);
        for (const organization of organizations) {
            const tenantEmployees = organizationEmployeesMap.get(organization);
            const { id: organizationId } = organization;
            const organizationTeams = await dataSource.manager.findBy(internal_1.OrganizationTeam, {
                organizationId,
                tenantId
            });
            const roles = await dataSource.manager.find(internal_1.Role, {});
            const team = faker_1.faker.helpers.arrayElement(organizationTeams);
            const employee = faker_1.faker.helpers.arrayElement(tenantEmployees);
            const orgTeamEmployee = new organization_team_employee_entity_1.OrganizationTeamEmployee();
            orgTeamEmployee.organizationTeamId = team.id;
            orgTeamEmployee.employeeId = employee.id;
            orgTeamEmployee.organizationTeam = team;
            orgTeamEmployee.employee = employee;
            orgTeamEmployee.organizationId = organizationId;
            orgTeamEmployee.tenantId = tenantId;
            orgTeamEmployee.role = faker_1.faker.helpers.arrayElement(roles);
            orgTeamEmployees.push(orgTeamEmployee);
        }
    }
    await dataSource.manager.save(orgTeamEmployees);
};
exports.createRandomOrganizationTeamEmployee = createRandomOrganizationTeamEmployee;
//# sourceMappingURL=organization-team-employee.seed.js.map
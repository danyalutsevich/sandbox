"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomTeam = exports.createDefaultTeams = void 0;
const organization_team_entity_1 = require("./organization-team.entity");
const organization_team_employee_entity_1 = require("../organization-team-employee/organization-team-employee.entity");
const index_1 = require("../../plugins/contracts/dist/index");
const _ = __importStar(require("underscore"));
const faker_1 = require("@faker-js/faker");
const default_organization_teams_1 = require("./default-organization-teams");
const createDefaultTeams = async (dataSource, organization, employees, roles) => {
    const teams = default_organization_teams_1.DEFAULT_ORGANIZATION_TEAMS;
    const organizationTeams = [];
    for (let i = 0; i < teams.length; i++) {
        const team = new organization_team_entity_1.OrganizationTeam();
        team.name = teams[i].name;
        team.organizationId = organization.id;
        team.tenant = organization.tenant;
        const filteredEmployees = employees.filter((e) => (teams[i].defaultMembers || []).indexOf(e.user.email) > -1);
        const teamEmployees = [];
        filteredEmployees.forEach((emp) => {
            const teamEmployee = new organization_team_employee_entity_1.OrganizationTeamEmployee();
            teamEmployee.employeeId = emp.id;
            teamEmployees.push(teamEmployee);
        });
        const managers = employees.filter((e) => (teams[i].manager || []).indexOf(e.user.email) > -1);
        managers.forEach((emp) => {
            const teamEmployee = new organization_team_employee_entity_1.OrganizationTeamEmployee();
            teamEmployee.employeeId = emp.id;
            teamEmployee.role = roles.filter((x) => x.name === index_1.RolesEnum.MANAGER)[0];
            teamEmployees.push(teamEmployee);
        });
        team.members = teamEmployees;
        organizationTeams.push(team);
    }
    await insertOrganizationTeam(dataSource, organizationTeams);
    return organizationTeams;
};
exports.createDefaultTeams = createDefaultTeams;
const createRandomTeam = async (dataSource, tenants, roles, tenantOrganizationsMap, organizationEmployeesMap) => {
    const teamNames = ['QA', 'Designers', 'Developers', 'Employees'];
    const organizationTeams = [];
    for (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        for (const organization of organizations) {
            const { id: tenantId } = tenant;
            const { id: organizationId } = organization;
            const employees = organizationEmployeesMap.get(organization);
            for (const name of teamNames) {
                const team = new organization_team_entity_1.OrganizationTeam();
                team.name = name;
                team.organizationId = organization.id;
                team.tenant = organization.tenant;
                team.members = [];
                /**
                 * Team Members
                 */
                const managers = _.chain(employees)
                    .shuffle()
                    .take(faker_1.faker.number.int({ min: 1, max: 5 }))
                    .values()
                    .value();
                managers.forEach((employee) => {
                    team.members.push(new organization_team_employee_entity_1.OrganizationTeamEmployee({
                        employeeId: employee.id,
                        tenantId,
                        organizationId,
                        role: roles.filter((role) => role.name === index_1.RolesEnum.MANAGER && role.tenantId === tenantId)
                    }));
                });
                organizationTeams.push(team);
            }
        }
    }
    const uniqueTeams = organizationTeams.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
    });
    await insertOrganizationTeam(dataSource, uniqueTeams);
    return uniqueTeams;
};
exports.createRandomTeam = createRandomTeam;
const insertOrganizationTeam = async (dataSource, teams) => {
    await dataSource.manager.save(teams);
};
//# sourceMappingURL=organization-team.seed.js.map
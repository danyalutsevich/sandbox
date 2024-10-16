"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRandomEmploymentTypes = exports.seedDefaultEmploymentTypes = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const organization_employment_type_entity_1 = require("./organization-employment-type.entity");
const default_organization_teams_1 = require("../organization-team/default-organization-teams");
const seedDefaultEmploymentTypes = async (dataSource, tenant, employees, defaultOrganization) => {
    const defaultTeams = default_organization_teams_1.DEFAULT_ORGANIZATION_TEAMS;
    const fullTimeEmployees = defaultTeams[0].defaultMembers;
    const contractors = defaultTeams[1].defaultMembers;
    const employmentTypes = Object.values(index_1.GenericEmploymentTypes).map((name) => {
        const employmentType = new organization_employment_type_entity_1.OrganizationEmploymentType();
        employmentType.name = name;
        employmentType.organizationId = defaultOrganization.id;
        employmentType.tenant = tenant;
        if (name === index_1.GenericEmploymentTypes.CONTRACT) {
            employmentType.members = employees;
        }
        else if (name === index_1.GenericEmploymentTypes.FULL_TIME) {
            employmentType.members = employees.filter((e) => fullTimeEmployees.includes(e.user.email));
        }
        else if (name === index_1.GenericEmploymentTypes.CONTRACTOR) {
            employmentType.members = employees.filter((e) => contractors.includes(e.user.email));
        }
        else {
            employmentType.members = [];
        }
        return employmentType;
    });
    for await (const employmentType of employmentTypes) {
        await insertEmploymentType(dataSource, [employmentType]);
    }
};
exports.seedDefaultEmploymentTypes = seedDefaultEmploymentTypes;
const seedRandomEmploymentTypes = async (dataSource, tenants, tenantOrganizationsMap) => {
    let employmentTypes = [];
    for (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        for (const organization of organizations) {
            const organizationEmploymentTypes = Object.values(index_1.GenericEmploymentTypes).map((name) => {
                const employmentType = new organization_employment_type_entity_1.OrganizationEmploymentType();
                employmentType.name = name;
                employmentType.organization = organization;
                employmentType.tenant = tenant;
                return employmentType;
            });
            employmentTypes = [
                ...employmentTypes,
                ...organizationEmploymentTypes
            ];
        }
        await insertEmploymentType(dataSource, employmentTypes);
    }
};
exports.seedRandomEmploymentTypes = seedRandomEmploymentTypes;
const insertEmploymentType = async (dataSource, employmentType) => {
    await dataSource.manager.save(employmentType);
};
//# sourceMappingURL=organization-employment-type.seed.js.map
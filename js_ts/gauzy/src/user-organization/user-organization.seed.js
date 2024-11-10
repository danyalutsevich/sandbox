"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomUsersOrganizations = exports.createDefaultUsersOrganizations = void 0;
const index_1 = require("../../plugins/common/dist/index");
const user_organization_entity_1 = require("./user-organization.entity");
const createDefaultUsersOrganizations = async (dataSource, tenant, organizations, users) => {
    let userOrganization;
    const usersOrganizations = [];
    for (const organization of organizations) {
        for (const user of users) {
            userOrganization = new user_organization_entity_1.UserOrganization();
            userOrganization.organization = organization;
            userOrganization.tenant = tenant;
            userOrganization.user = user;
            usersOrganizations.push(userOrganization);
        }
    }
    return await insertUserOrganization(dataSource, usersOrganizations);
};
exports.createDefaultUsersOrganizations = createDefaultUsersOrganizations;
const createRandomUsersOrganizations = async (dataSource, tenants, tenantOrganizationsMap, tenantSuperAdminsMap, tenantUsersMap, employeesPerOrganization, adminPerOrganization) => {
    const usersOrganizations = [];
    const organizationUsersMap = new Map();
    for await (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        const superAdmins = tenantSuperAdminsMap.get(tenant);
        const { adminUsers, employeeUsers } = tenantUsersMap.get(tenant);
        for await (const [key, organization] of Object.entries(organizations)) {
            const employees = (0, index_1.chunks)(employeeUsers, employeesPerOrganization)[key] || [];
            const admins = (0, index_1.chunks)(adminUsers, adminPerOrganization)[key] || [];
            const users = [
                ...superAdmins || [],
                ...admins,
                ...employees
            ];
            for await (const user of users) {
                if (user.id) {
                    const userOrganization = new user_organization_entity_1.UserOrganization();
                    userOrganization.organizationId = organization.id;
                    userOrganization.tenantId = organization.tenantId;
                    userOrganization.userId = user.id;
                    usersOrganizations.push(userOrganization);
                }
            }
            organizationUsersMap.set(organization, employees);
        }
    }
    await insertUserOrganization(dataSource, usersOrganizations);
    return organizationUsersMap;
};
exports.createRandomUsersOrganizations = createRandomUsersOrganizations;
const insertUserOrganization = async (dataSource, userOrganizations) => {
    return await dataSource.manager.save(userOrganizations);
};
//# sourceMappingURL=user-organization.seed.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomTimeOffPolicies = exports.createDefaultTimeOffPolicy = void 0;
const time_off_policy_entity_1 = require("./time-off-policy.entity");
const faker_1 = require("@faker-js/faker");
const default_time_off_policies_1 = require("./default-time-off-policies");
const createDefaultTimeOffPolicy = async (dataSource, tenant, organization, employees) => {
    const defaultTimeOffPolicy = new time_off_policy_entity_1.TimeOffPolicy();
    defaultTimeOffPolicy.name = 'Default Policy';
    defaultTimeOffPolicy.organization = organization;
    defaultTimeOffPolicy.tenant = tenant;
    defaultTimeOffPolicy.requiresApproval = false;
    defaultTimeOffPolicy.paid = true;
    defaultTimeOffPolicy.employees = employees;
    await insertDefaultPolicy(dataSource, defaultTimeOffPolicy);
    return defaultTimeOffPolicy;
};
exports.createDefaultTimeOffPolicy = createDefaultTimeOffPolicy;
const insertDefaultPolicy = async (dataSource, defaultPolicy) => {
    await dataSource
        .createQueryBuilder()
        .insert()
        .into(time_off_policy_entity_1.TimeOffPolicy)
        .values(defaultPolicy)
        .execute();
};
const createRandomTimeOffPolicies = async (dataSource, tenants, tenantOrganizationsMap) => {
    const policies = [];
    (tenants || []).forEach((tenant) => {
        const organizations = tenantOrganizationsMap.get(tenant);
        (organizations || []).forEach((organization) => {
            default_time_off_policies_1.DEFAULT_TIMEOFF_POLICIES.forEach((name) => {
                const policy = new time_off_policy_entity_1.TimeOffPolicy();
                policy.name = name;
                policy.organization = organization;
                policy.tenant = tenant;
                policy.paid = faker_1.faker.helpers.arrayElement([true, false]);
                policy.requiresApproval = faker_1.faker.helpers.arrayElement([
                    true,
                    false
                ]);
                policies.push(policy);
            });
        });
    });
    return await dataSource.manager.save(policies);
};
exports.createRandomTimeOffPolicies = createRandomTimeOffPolicies;
//# sourceMappingURL=time-off-policy.seed.js.map
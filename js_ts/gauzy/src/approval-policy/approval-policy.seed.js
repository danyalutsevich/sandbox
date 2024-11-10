"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomApprovalPolicyForOrg = exports.createDefaultApprovalPolicyForOrg = void 0;
const approval_policy_entity_1 = require("./approval-policy.entity");
const default_approval_policies_1 = require("./default-approval-policies");
const createDefaultApprovalPolicyForOrg = async (dataSource, defaultData) => {
    const promises = [];
    defaultData.orgs.forEach((org) => {
        const defaultApprovalPolicy = new approval_policy_entity_1.ApprovalPolicy();
        defaultApprovalPolicy.name = 'Default Approval Policy';
        defaultApprovalPolicy.organization = org;
        defaultApprovalPolicy.tenant = org.tenant;
        defaultApprovalPolicy.description = 'Default approval policy';
        defaultApprovalPolicy.approvalType = 'DEFAULT_APPROVAL_POLICY';
        promises.push(insertDefaultPolicy(dataSource, defaultApprovalPolicy));
    });
    return await Promise.all(promises);
};
exports.createDefaultApprovalPolicyForOrg = createDefaultApprovalPolicyForOrg;
const insertDefaultPolicy = async (dataSource, defaultPolicy) => {
    await dataSource
        .createQueryBuilder()
        .insert()
        .into(approval_policy_entity_1.ApprovalPolicy)
        .values(defaultPolicy)
        .execute();
    return defaultPolicy;
};
const createRandomApprovalPolicyForOrg = async (dataSource, tenants, tenantOrganizationsMap) => {
    const policies = [];
    for (const tenant of tenants) {
        const orgs = tenantOrganizationsMap.get(tenant);
        orgs.forEach((org) => {
            default_approval_policies_1.DEFAULT_APPROVAL_POLICIES.forEach((name) => {
                const policy = new approval_policy_entity_1.ApprovalPolicy();
                policy.description = name;
                policy.name = name;
                policy.tenant = tenant;
                policy.organizationId = org.id;
                policy.approvalType = name.replace(/\s+/g, '_').toUpperCase();
                policies.push(policy);
            });
        });
    }
    await dataSource
        .createQueryBuilder()
        .insert()
        .into(approval_policy_entity_1.ApprovalPolicy)
        .values(policies)
        .execute();
    return policies;
};
exports.createRandomApprovalPolicyForOrg = createRandomApprovalPolicyForOrg;
//# sourceMappingURL=approval-policy.seed.js.map
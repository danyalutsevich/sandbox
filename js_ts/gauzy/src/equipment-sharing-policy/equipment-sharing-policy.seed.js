"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomEquipmentSharingPolicy = exports.createDefaultEquipmentSharingPolicy = void 0;
const equipment_sharing_policy_entity_1 = require("./equipment-sharing-policy.entity");
const createDefaultEquipmentSharingPolicy = async (dataSource, tenant, organizations) => {
    for await (const organization of organizations) {
        const defaultEquipmentSharingPolicy = new equipment_sharing_policy_entity_1.EquipmentSharingPolicy();
        defaultEquipmentSharingPolicy.name = 'Default Approval Policy';
        defaultEquipmentSharingPolicy.organization = organization;
        defaultEquipmentSharingPolicy.tenant = tenant;
        defaultEquipmentSharingPolicy.description = 'Default approval policy';
        await insertDefaultPolicy(dataSource, defaultEquipmentSharingPolicy);
    }
};
exports.createDefaultEquipmentSharingPolicy = createDefaultEquipmentSharingPolicy;
const insertDefaultPolicy = async (dataSource, defaultPolicy) => {
    await dataSource
        .createQueryBuilder()
        .insert()
        .into(equipment_sharing_policy_entity_1.EquipmentSharingPolicy)
        .values(defaultPolicy)
        .execute();
};
const createRandomEquipmentSharingPolicy = async (dataSource, tenants, tenantOrganizationsMap) => {
    const policies = [];
    const policyArray = ['Equipment Sharing Policy'];
    for await (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        for await (const organization of organizations) {
            policyArray.forEach((name) => {
                const policy = new equipment_sharing_policy_entity_1.EquipmentSharingPolicy();
                policy.description = name;
                policy.name = name;
                policy.organization = organization;
                policy.tenant = tenant;
                policies.push(policy);
            });
        }
    }
    await dataSource
        .createQueryBuilder()
        .insert()
        .into(equipment_sharing_policy_entity_1.EquipmentSharingPolicy)
        .values(policies)
        .execute();
    return policies;
};
exports.createRandomEquipmentSharingPolicy = createRandomEquipmentSharingPolicy;
//# sourceMappingURL=equipment-sharing-policy.seed.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomOrganizationVendors = exports.createOrganizationVendors = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const internal_1 = require("./../core/entities/internal");
const createOrganizationVendors = async (dataSource, tenant, organizations) => {
    let defaultOrganizationVendors = [];
    for (const organization of organizations) {
        const vendors = Object.values(index_1.OrganizationVendorEnum).map((name) => ({
            name,
            organizationId: organization.id,
            organization,
            tenant: tenant
        }));
        defaultOrganizationVendors = [
            ...defaultOrganizationVendors,
            ...vendors
        ];
    }
    await insertOrganizationVendors(dataSource, defaultOrganizationVendors);
    return defaultOrganizationVendors;
};
exports.createOrganizationVendors = createOrganizationVendors;
const createRandomOrganizationVendors = async (dataSource, tenants, tenantOrganizationsMap) => {
    let organizationVendors = [];
    const organizationVendorsMap = new Map();
    for (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        for (const organization of organizations) {
            const vendors = Object.values(index_1.OrganizationVendorEnum).map((name) => ({
                name,
                organization,
                organizationId: organization.id,
                tenant: organization.tenant
            }));
            organizationVendorsMap.set(organization, vendors);
            organizationVendors = [...organizationVendors, ...vendors];
        }
    }
    await insertOrganizationVendors(dataSource, organizationVendors);
    return organizationVendorsMap;
};
exports.createRandomOrganizationVendors = createRandomOrganizationVendors;
const insertOrganizationVendors = async (dataSource, organizationVendors) => {
    await dataSource
        .createQueryBuilder()
        .insert()
        .into(internal_1.OrganizationVendor)
        .values(organizationVendors)
        .execute();
};
//# sourceMappingURL=organization-vendor.seed.js.map
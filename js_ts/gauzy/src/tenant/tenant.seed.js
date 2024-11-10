"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomTenants = exports.createDefaultTenant = exports.getDefaultTenant = void 0;
const tenant_entity_1 = require("./tenant.entity");
const faker_1 = require("@faker-js/faker");
const default_tenants_1 = require("./default-tenants");
const getDefaultTenant = async (dataSource, tenantName = default_tenants_1.DEFAULT_EVER_TENANT) => {
    const repo = dataSource.getRepository(tenant_entity_1.Tenant);
    const existedTenant = await repo.findOne({ where: { name: tenantName } });
    return existedTenant;
};
exports.getDefaultTenant = getDefaultTenant;
const createDefaultTenant = async (dataSource, tenantName) => {
    const tenant = {
        name: tenantName
    };
    await insertTenant(dataSource, tenant);
    return tenant;
};
exports.createDefaultTenant = createDefaultTenant;
const createRandomTenants = async (dataSource, noOfTenants = 0) => {
    const randomTenants = [];
    for (let i = 0; i < noOfTenants; i++) {
        const tenant = new tenant_entity_1.Tenant();
        tenant.name = faker_1.faker.company.name();
        randomTenants.push(tenant);
    }
    return await insertTenants(dataSource, randomTenants);
};
exports.createRandomTenants = createRandomTenants;
const insertTenant = async (dataSource, tenant) => {
    const repo = dataSource.getRepository(tenant_entity_1.Tenant);
    const existedTenant = await repo.findOne({ where: { name: tenant.name } });
    if (existedTenant)
        return existedTenant;
    else {
        await dataSource
            .createQueryBuilder()
            .insert()
            .into(tenant_entity_1.Tenant)
            .values(tenant)
            .execute();
        return tenant;
    }
};
const insertTenants = async (dataSource, tenants) => {
    return await dataSource.manager.save(tenants);
};
//# sourceMappingURL=tenant.seed.js.map
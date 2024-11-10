"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomIntegrationTenant = void 0;
const faker_1 = require("@faker-js/faker");
const index_1 = require("../../plugins/contracts/dist/index");
const integration_tenant_entity_1 = require("./integration-tenant.entity");
const internal_1 = require("./../core/entities/internal");
const createRandomIntegrationTenant = async (dataSource, tenants) => {
    if (!tenants) {
        console.warn('Warning: tenants not found, Integration Tenant  will not be created');
        return;
    }
    const integrationTenants = [];
    for (const tenant of tenants) {
        const { id: tenantId } = tenant;
        const organizations = await dataSource.manager.findBy(internal_1.Organization, {
            tenantId
        });
        const integrationTenant = new integration_tenant_entity_1.IntegrationTenant();
        //todo:change name with some real values;
        integrationTenant.name = faker_1.faker.helpers.arrayElement(Object.values(index_1.IntegrationEnum));
        integrationTenant.entitySettings = [];
        integrationTenant.tenant = tenant;
        integrationTenant.organization = faker_1.faker.helpers.arrayElement(organizations);
        integrationTenants.push(integrationTenant);
    }
    await dataSource.manager.save(integrationTenants);
};
exports.createRandomIntegrationTenant = createRandomIntegrationTenant;
//# sourceMappingURL=integration-tenant.seed.js.map
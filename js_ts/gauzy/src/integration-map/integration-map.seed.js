"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomIntegrationMap = void 0;
const integration_map_entity_1 = require("./integration-map.entity");
const faker_1 = require("@faker-js/faker");
const integration_tenant_entity_1 = require("../integration-tenant/integration-tenant.entity");
const organization_entity_1 = require("../organization/organization.entity");
const index_1 = require("../../plugins/contracts/dist/index");
const createRandomIntegrationMap = async (dataSource, tenants) => {
    if (!tenants) {
        console.warn('Warning: tenants not found, Integration Map  will not be created');
        return;
    }
    const integrationMaps = [];
    for (const tenant of tenants) {
        const { id: tenantId } = tenant;
        const integrationTenants = await dataSource.manager.findBy(integration_tenant_entity_1.IntegrationTenant, {
            tenantId
        });
        const organizations = await dataSource.manager.findBy(organization_entity_1.Organization, {
            tenantId
        });
        for (const integrationTenant of integrationTenants) {
            const integrationMap = new integration_map_entity_1.IntegrationMap();
            integrationMap.integration = integrationTenant;
            integrationMap.organization = faker_1.faker.helpers.arrayElement(organizations);
            integrationMap.tenant = tenant;
            //todo: need to understand real values here
            integrationMap.entity = faker_1.faker.helpers.arrayElement(Object.values(index_1.IntegrationEntity));
            integrationMap.sourceId = faker_1.faker.string.uuid();
            integrationMap.gauzyId = faker_1.faker.string.uuid();
            integrationMaps.push(integrationMap);
        }
    }
    return await dataSource.manager.save(integrationMaps);
};
exports.createRandomIntegrationMap = createRandomIntegrationMap;
//# sourceMappingURL=integration-map.seed.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomIntegrationEntitySetting = void 0;
const faker_1 = require("@faker-js/faker");
const index_1 = require("../../plugins/plugins/integration-hubstaff/dist/index");
const integration_entity_setting_entity_1 = require("./integration-entity-setting.entity");
const internal_1 = require("./../core/entities/internal");
const createRandomIntegrationEntitySetting = async (dataSource, tenants) => {
    if (!tenants) {
        console.warn('Warning: tenants not found, Integration Entity Setting will not be created.');
        return;
    }
    const integrationEntitySettings = [];
    const integrationEntitySettingTiedEntities = [];
    for (const tenant of tenants) {
        const { id: tenantId } = tenant;
        const organizations = await dataSource.manager.findBy(internal_1.Organization, {
            tenantId
        });
        const integrationTenants = await dataSource.manager.findBy(internal_1.IntegrationTenant, {
            tenantId
        });
        for (const integrationTenant of integrationTenants) {
            const integrationEntitySetting = new integration_entity_setting_entity_1.IntegrationEntitySetting();
            integrationEntitySetting.integration = integrationTenant;
            integrationEntitySetting.tiedEntities = integrationEntitySettingTiedEntities;
            integrationEntitySetting.sync = faker_1.faker.datatype.boolean();
            (integrationEntitySetting.organization = faker_1.faker.helpers.arrayElement(organizations)),
                (integrationEntitySetting.tenant = tenant);
            //todo: need to understand real values here
            integrationEntitySetting.entity = faker_1.faker.helpers.arrayElement(index_1.DEFAULT_ENTITY_SETTINGS)['entity'];
            integrationEntitySettings.push(integrationEntitySetting);
        }
    }
    await dataSource.manager.save(integrationEntitySettings);
};
exports.createRandomIntegrationEntitySetting = createRandomIntegrationEntitySetting;
//# sourceMappingURL=integration-entity-setting.seed.js.map
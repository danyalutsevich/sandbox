"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomIntegrationEntitySettingTied = void 0;
const faker_1 = require("@faker-js/faker");
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/plugins/integration-hubstaff/dist/index");
const internal_1 = require("./../core/entities/internal");
const integration_entity_setting_tied_entity_1 = require("./integration-entity-setting-tied.entity");
const createRandomIntegrationEntitySettingTied = async (dataSource, tenants) => {
    if (!tenants) {
        console.warn('Warning: tenants not found, Integration Entity Setting  will not be created');
        return;
    }
    const randomIntegrationEntitySettingsTiedEntity = [];
    for (const tenant of tenants) {
        const { id: tenantId } = tenant;
        const organizations = await dataSource.manager.findBy(internal_1.Organization, {
            tenantId
        });
        const integrationTenants = await dataSource.manager.findBy(internal_1.IntegrationTenant, {
            tenantId
        });
        for (const integrationTenant of integrationTenants) {
            const integrationEntitySettings = await dataSource.manager.findBy(internal_1.IntegrationEntitySetting, {
                integrationId: integrationTenant.id
            });
            for (const integrationEntitySetting of integrationEntitySettings) {
                const integrationEntitySettingTiedEntity = new integration_entity_setting_tied_entity_1.IntegrationEntitySettingTied();
                integrationEntitySettingTiedEntity.integrationEntitySetting = integrationEntitySetting;
                integrationEntitySettingTiedEntity.sync = faker_1.faker.datatype.boolean();
                integrationEntitySettingTiedEntity.organization = faker_1.faker.helpers.arrayElement(organizations);
                integrationEntitySettingTiedEntity.tenant = tenant;
                //todo: need to understand real values here
                if (integrationEntitySetting['entity'] ===
                    index_1.IntegrationEntity.PROJECT) {
                    integrationEntitySettingTiedEntity.entity = faker_1.faker.helpers.arrayElement(index_2.PROJECT_TIED_ENTITIES)['entity'];
                }
                else {
                    integrationEntitySettingTiedEntity.entity = faker_1.faker.helpers.arrayElement(Object.values(index_1.IntegrationEntity));
                }
                randomIntegrationEntitySettingsTiedEntity.push(integrationEntitySettingTiedEntity);
            }
        }
    }
    await dataSource.manager.save(randomIntegrationEntitySettingsTiedEntity);
};
exports.createRandomIntegrationEntitySettingTied = createRandomIntegrationEntitySettingTied;
//# sourceMappingURL=integration-entity-setting-tied.seed.js.map
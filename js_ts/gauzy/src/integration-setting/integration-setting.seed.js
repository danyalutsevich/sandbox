"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomIntegrationSetting = void 0;
const integration_setting_entity_1 = require("./integration-setting.entity");
const faker_1 = require("@faker-js/faker");
const internal_1 = require("./../core/entities/internal");
const createRandomIntegrationSetting = async (dataSource, tenants) => {
    if (!tenants) {
        console.warn('Warning: tenants not found, Integration Setting  will not be created');
        return;
    }
    const integrationSettings = [];
    for (const tenant of tenants) {
        const { id: tenantId } = tenant;
        const integrationTenants = await dataSource.manager.findBy(internal_1.IntegrationTenant, {
            tenantId
        });
        const organizations = await dataSource.manager.findBy(internal_1.Organization, {
            tenantId
        });
        for (const integrationTenant of integrationTenants) {
            const integrationSetting = new integration_setting_entity_1.IntegrationSetting();
            integrationSetting.integration = integrationTenant;
            integrationSetting.organization = faker_1.faker.helpers.arrayElement(organizations);
            integrationSetting.tenant = tenant;
            //todo: need to understand real values here
            integrationSetting.settingsName =
                'Setting-' + faker_1.faker.number.int(40);
            integrationSetting.settingsValue = faker_1.faker.person.jobArea();
            integrationSettings.push(integrationSetting);
        }
    }
    await dataSource.manager.save(integrationSettings);
};
exports.createRandomIntegrationSetting = createRandomIntegrationSetting;
//# sourceMappingURL=integration-setting.seed.js.map
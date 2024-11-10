"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultIntegrations = void 0;
const index_1 = require("../../plugins/config/dist/index");
const utils_1 = require("./../core/seeds/utils");
const integration_entity_1 = require("./integration.entity");
const default_integration_1 = require("./default-integration");
const config = (0, index_1.getConfig)();
const createDefaultIntegrations = async (dataSource, integrationTypes) => {
    if (!integrationTypes) {
        console.warn('Warning: integrationTypes not found, DefaultIntegrations will not be created');
        return;
    }
    const destDir = 'integrations';
    await (0, utils_1.cleanAssets)(config, destDir);
    const integrations = [];
    for await (const integration of default_integration_1.DEFAULT_INTEGRATIONS) {
        const { name, imgSrc, isComingSoon, integrationTypesMap, order, provider, redirectUrl } = integration;
        const entity = new integration_entity_1.Integration();
        entity.name = name;
        entity.imgSrc = (0, utils_1.copyAssets)(imgSrc, config, destDir);
        entity.isComingSoon = isComingSoon;
        entity.order = order;
        entity.redirectUrl = redirectUrl;
        entity.provider = provider;
        entity.integrationTypes = integrationTypes.filter((it) => integrationTypesMap.includes(it.name));
        integrations.push(entity);
    }
    return await insertIntegrations(dataSource, integrations);
};
exports.createDefaultIntegrations = createDefaultIntegrations;
const insertIntegrations = async (dataSource, integrations) => await dataSource.manager.save(integrations);
//# sourceMappingURL=integration.seed.js.map
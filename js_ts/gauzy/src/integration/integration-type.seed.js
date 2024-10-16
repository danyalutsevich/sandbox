"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultIntegrationTypes = void 0;
const integration_type_entity_1 = require("./integration-type.entity");
const default_integration_type_1 = require("./default-integration-type");
const createDefaultIntegrationTypes = async (dataSource) => {
    const integrationTypes = default_integration_type_1.DEFAULT_INTEGRATION_TYPES.map(({ name, groupName, order, icon, description }) => {
        const entity = new integration_type_entity_1.IntegrationType();
        entity.name = name;
        entity.groupName = groupName;
        entity.order = order;
        entity.icon = icon;
        entity.description = description;
        return entity;
    });
    return await insertIntegrationTypes(dataSource, integrationTypes);
};
exports.createDefaultIntegrationTypes = createDefaultIntegrationTypes;
const insertIntegrationTypes = async (dataSource, integrationTypes) => {
    return await dataSource.manager.save(integrationTypes);
};
//# sourceMappingURL=integration-type.seed.js.map
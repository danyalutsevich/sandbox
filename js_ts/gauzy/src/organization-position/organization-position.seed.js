"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRandomOrganizationPosition = exports.seedDefaultOrganizationPosition = void 0;
const organization_position_entity_1 = require("./organization-position.entity");
const default_organization_positions_1 = require("./default-organization-positions");
const seedDefaultOrganizationPosition = async (dataSource, tenant, organizations) => {
    let positions = [];
    const organizationPositions = default_organization_positions_1.DEFAULT_ORGANIZATION_POSITIONS.map((name) => {
        const organizationPosition = new organization_position_entity_1.OrganizationPosition();
        organizationPosition.name = name;
        organizationPosition.organizationId = organizations.id;
        organizationPosition.tenant = tenant;
        return organizationPosition;
    });
    positions = [...positions, ...organizationPositions];
    await insertEmploymentPosition(dataSource, positions);
};
exports.seedDefaultOrganizationPosition = seedDefaultOrganizationPosition;
const seedRandomOrganizationPosition = async (dataSource, tenants, tenantOrganizationsMap) => {
    let positions = [];
    for (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        organizations.forEach(({ id: organizationId }) => {
            const organizationPositions = default_organization_positions_1.DEFAULT_ORGANIZATION_POSITIONS.map((name) => {
                const organizationPosition = new organization_position_entity_1.OrganizationPosition();
                organizationPosition.name = name;
                organizationPosition.organizationId = organizationId;
                organizationPosition.tenant = tenant;
                return organizationPosition;
            });
            positions = [...positions, ...organizationPositions];
        });
        await insertEmploymentPosition(dataSource, positions);
    }
};
exports.seedRandomOrganizationPosition = seedRandomOrganizationPosition;
const insertEmploymentPosition = async (dataSource, organizationPosition) => {
    await dataSource.manager.save(organizationPosition);
};
//# sourceMappingURL=organization-position.seed.js.map
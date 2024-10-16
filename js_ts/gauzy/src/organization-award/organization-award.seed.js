"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomAwards = exports.createDefaultAwards = void 0;
const organization_award_entity_1 = require("./organization-award.entity");
const faker_1 = require("@faker-js/faker");
const default_organization_awards_1 = require("./default-organization-awards");
const createDefaultAwards = async (dataSource, tenant, organizations) => {
    const awards = [];
    const awardsNames = Object.keys(default_organization_awards_1.DEFAULT_ORGANIZATION_AWARDS);
    for (const org of organizations) {
        for (const awardsName of awardsNames) {
            const award = new organization_award_entity_1.OrganizationAward();
            award.name = awardsName;
            award.year = default_organization_awards_1.DEFAULT_ORGANIZATION_AWARDS[awardsName];
            award.organization = org;
            award.tenant = tenant;
            awards.push(award);
        }
    }
    return await dataSource.manager.save(awards);
};
exports.createDefaultAwards = createDefaultAwards;
const createRandomAwards = async (dataSource, tenants, tenantOrganizationsMap) => {
    const awards = [];
    for (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        const awardsData = [
            'Best Product',
            'Best Revenue',
            'Best Idea',
            'Rising Star Product'
        ];
        for (const organization of organizations) {
            for (let i = 0; i < awardsData.length; i++) {
                const award = new organization_award_entity_1.OrganizationAward();
                award.name = awardsData[i];
                award.year = faker_1.faker.number.int({ min: 1990, max: 2020 }).toString();
                award.organization = organization;
                award.tenant = tenant;
                awards.push(award);
            }
        }
    }
    return await dataSource.manager.save(awards);
};
exports.createRandomAwards = createRandomAwards;
//# sourceMappingURL=organization-award.seed.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomOrganizationTags = exports.createTags = exports.createDefaultTags = void 0;
const faker_1 = require("@faker-js/faker");
const default_tags_1 = require("./default-tags");
const internal_1 = require("./../core/entities/internal");
const createDefaultTags = async (dataSource, tenant, organizations) => {
    let tags = [];
    for (const organization of organizations) {
        const organizationTags = Object.values(default_tags_1.DEFAULT_GLOBAL_TAGS).map((name) => {
            const orgTags = new internal_1.Tag();
            orgTags.name = name;
            orgTags.description = '';
            orgTags.color = faker_1.faker.color.human();
            if (orgTags.color === 'white') {
                orgTags.color = 'red';
            }
            orgTags.organization = organization;
            orgTags.tenant = tenant;
            return orgTags;
        });
        tags = [...tags, ...organizationTags];
    }
    return await dataSource.manager.save(tags);
};
exports.createDefaultTags = createDefaultTags;
const createTags = async (dataSource) => {
    const tags = [];
    for (const name of default_tags_1.DEFAULT_ORGANIZATION_TAGS) {
        const tag = new internal_1.Tag();
        tag.name = name;
        tag.description = '';
        tag.color = faker_1.faker.color.human();
        if (tag.color === 'white') {
            tag.color = 'red';
        }
        tags.push(tag);
    }
    await dataSource
        .createQueryBuilder()
        .insert()
        .into(internal_1.Tag)
        .values(tags)
        .execute();
    return tags;
};
exports.createTags = createTags;
const createRandomOrganizationTags = async (dataSource, tenants, tenantOrganizationsMap) => {
    let tags = [];
    for (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        organizations.forEach((org) => {
            const organizationTags = Object.values(default_tags_1.DEFAULT_ORGANIZATION_TAGS).map((name) => {
                const orgTags = new internal_1.Tag();
                orgTags.name = name;
                orgTags.description = '';
                orgTags.color = faker_1.faker.color.human();
                orgTags.organization = org;
                orgTags.tenant = tenant;
                if (orgTags.color === 'white') {
                    orgTags.color = 'red';
                }
                return orgTags;
            });
            tags = [...tags, ...organizationTags];
        });
    }
    return await dataSource.manager.save(tags);
};
exports.createRandomOrganizationTags = createRandomOrganizationTags;
//# sourceMappingURL=tag.seed.js.map
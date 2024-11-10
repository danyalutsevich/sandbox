"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomOrganizationLanguage = exports.createDefaultOrganizationLanguage = void 0;
const typeorm_1 = require("typeorm");
const organization_language_entity_1 = require("./organization-language.entity");
const faker_1 = require("@faker-js/faker");
const index_1 = require("../../plugins/contracts/dist/index");
const language_entity_1 = require("../language/language.entity");
const default_organization_languages_1 = require("./default-organization-languages");
const index_2 = require("../../plugins/config/dist/index");
const createDefaultOrganizationLanguage = async (dataSource, tenant, defaultOrganizations) => {
    const mapOrganizationLanguage = [];
    const allLanguage = await dataSource.getRepository(language_entity_1.Language).findBy({
        code: (0, typeorm_1.In)(Object.values(index_1.LanguagesEnum))
    });
    for (const defaultOrganization of defaultOrganizations) {
        for (const language of allLanguage) {
            const organization = new organization_language_entity_1.OrganizationLanguage();
            organization.organization = defaultOrganization;
            organization.tenant = tenant;
            organization.language = language;
            organization.name = language.name;
            organization.level = default_organization_languages_1.DEFAULT_ORGANIZATION_LANGUAGES[language.name] || default_organization_languages_1.DEFAULT_LANGUAGE_LEVEL;
            mapOrganizationLanguage.push(organization);
        }
    }
    await insertRandomOrganizationLanguage(dataSource, mapOrganizationLanguage);
    return mapOrganizationLanguage;
};
exports.createDefaultOrganizationLanguage = createDefaultOrganizationLanguage;
const createRandomOrganizationLanguage = async (dataSource, tenants, tenantOrganizationsMap) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, organization language not be created');
        return;
    }
    const mapOrganizationLanguage = [];
    const allLanguage = await dataSource.manager.createQueryBuilder(language_entity_1.Language, "language")
        .orderBy(`${(0, index_2.isMySQL)() ? 'rand()' : 'random()'}`)
        .limit(4)
        .getMany();
    for (const tenant of tenants) {
        const tenantOrganization = tenantOrganizationsMap.get(tenant);
        for (const tenantOrg of tenantOrganization) {
            const language = faker_1.faker.helpers.arrayElement(allLanguage);
            const organization = new organization_language_entity_1.OrganizationLanguage();
            organization.organization = tenantOrg;
            organization.tenant = tenant;
            organization.language = language;
            organization.name = language.name;
            organization.level = default_organization_languages_1.DEFAULT_ORGANIZATION_LANGUAGES[language.name] || default_organization_languages_1.DEFAULT_LANGUAGE_LEVEL;
            mapOrganizationLanguage.push(organization);
        }
    }
    await insertRandomOrganizationLanguage(dataSource, mapOrganizationLanguage);
    return mapOrganizationLanguage;
};
exports.createRandomOrganizationLanguage = createRandomOrganizationLanguage;
const insertRandomOrganizationLanguage = async (dataSource, data) => {
    await dataSource
        .createQueryBuilder()
        .insert()
        .into(organization_language_entity_1.OrganizationLanguage)
        .values(data)
        .execute();
};
//# sourceMappingURL=organization-language.seed.js.map
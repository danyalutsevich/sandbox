"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultMerchants = exports.createRandomMerchants = void 0;
const faker_1 = require("@faker-js/faker");
const internal_1 = require("./../core/entities/internal");
const utils_1 = require("../core/seeds/utils");
const createRandomMerchants = async (dataSource, tenants, tenantOrganizationsMap) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, Product Merchants not be created');
        return;
    }
    const countries = await dataSource.manager.find(internal_1.Country);
    const merchants = [];
    for await (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        for await (const organization of organizations) {
            for (let i = 0; i <= Math.floor(Math.random() * 3) + 1; i++) {
                const merchant = applyRandomProperties(tenant, organization, countries);
                merchant.organization = organization;
                merchant.tenant = tenant;
                merchants.push(merchant);
            }
        }
    }
    await dataSource.manager.save(merchants);
};
exports.createRandomMerchants = createRandomMerchants;
const createDefaultMerchants = async (dataSource, tenant, organizations) => {
    const countries = await dataSource.manager.find(internal_1.Country);
    let merchants = [];
    for (const organization of organizations) {
        const merchant = applyRandomProperties(tenant, organization, countries);
        merchant.organization = organization;
        merchant.tenant = tenant;
        merchants.push(merchant);
    }
    await dataSource.manager.save(merchants);
};
exports.createDefaultMerchants = createDefaultMerchants;
const applyRandomProperties = (tenant, organization, countries) => {
    const merchant = new internal_1.Merchant();
    merchant.name = faker_1.faker.company.name();
    merchant.code = faker_1.faker.string.alphanumeric();
    merchant.email = (0, utils_1.getEmailWithPostfix)(faker_1.faker.internet.exampleEmail(merchant.name));
    merchant.description = faker_1.faker.lorem.words();
    merchant.phone = faker_1.faker.phone.number();
    merchant.organization = organization;
    merchant.tenant = tenant;
    const contact = new internal_1.Contact();
    contact.firstName = faker_1.faker.person.firstName();
    contact.lastName = faker_1.faker.person.lastName();
    contact.name = contact.firstName + ' ' + contact.lastName;
    contact.website = faker_1.faker.internet.url();
    contact.address = faker_1.faker.location.streetAddress();
    contact.address2 = faker_1.faker.location.secondaryAddress();
    contact.city = faker_1.faker.location.city();
    contact.country = faker_1.faker.helpers.arrayElement(countries).isoCode;
    contact.fax = faker_1.faker.number.int(8).toString();
    contact.longitude = +faker_1.faker.location.longitude();
    contact.latitude = +faker_1.faker.location.latitude();
    contact.organization = organization;
    contact.tenant = tenant;
    const logo = new internal_1.ImageAsset();
    logo.name = faker_1.faker.company.name();
    logo.url = faker_1.faker.image.url();
    logo.organization = organization;
    logo.tenant = tenant;
    merchant.logo = logo;
    merchant.contact = contact;
    return merchant;
};
//# sourceMappingURL=merchant.seed.js.map
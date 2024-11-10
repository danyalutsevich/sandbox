"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomContact = exports.createRandomContacts = void 0;
const faker_1 = require("@faker-js/faker");
const internal_1 = require("./../core/entities/internal");
const createRandomContacts = async (dataSource, tenant, organizations, noOfRandomContacts) => {
    const contacts = [];
    for (let i = 0; i < noOfRandomContacts; i++) {
        for await (const organization of organizations) {
            const contact = (0, exports.getRandomContact)(tenant, organization);
            // organization primary contact location
            organization.contact = contact;
            await dataSource.manager.save(organization);
            contacts.push(contact);
        }
    }
    return await dataSource.manager.save(contacts);
};
exports.createRandomContacts = createRandomContacts;
const getRandomContact = (tenant, organization) => {
    const contact = new internal_1.Contact();
    contact.firstName = faker_1.faker.person.firstName();
    contact.lastName = faker_1.faker.person.lastName();
    contact.website = faker_1.faker.internet.url();
    contact.address = faker_1.faker.location.streetAddress();
    contact.address2 = faker_1.faker.location.secondaryAddress();
    contact.city = faker_1.faker.location.city();
    contact.country = faker_1.faker.location.countryCode();
    contact.name = contact.firstName + ' ' + contact.lastName;
    contact.longitude = +faker_1.faker.location.longitude();
    contact.latitude = +faker_1.faker.location.latitude();
    contact.postcode = faker_1.faker.location.zipCode();
    contact.organization = organization;
    contact.tenant = tenant;
    return contact;
};
exports.getRandomContact = getRandomContact;
//# sourceMappingURL=contact.seed.js.map
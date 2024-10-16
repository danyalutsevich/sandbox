"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomEmailSent = exports.createDefaultEmailSent = void 0;
const typeorm_1 = require("typeorm");
const faker_1 = require("@faker-js/faker");
const email_history_entity_1 = require("./email-history.entity");
const internal_1 = require("../core/entities/internal");
const utils_1 = require("../core/seeds/utils");
const createDefaultEmailSent = async (dataSource, tenant, organization, noOfEmailsPerOrganization) => {
    const emailTemplates = await dataSource.manager.findBy(internal_1.EmailTemplate, {
        name: (0, typeorm_1.Not)((0, typeorm_1.ILike)(`%subject%`))
    });
    const users = await dataSource.getRepository(internal_1.User).find();
    let sentEmails = [];
    sentEmails = await dataOperation(dataSource, sentEmails, noOfEmailsPerOrganization, organization, emailTemplates, tenant, users);
    return sentEmails;
};
exports.createDefaultEmailSent = createDefaultEmailSent;
const createRandomEmailSent = async (dataSource, tenants, tenantOrganizationsMap, noOfEmailsPerOrganization) => {
    const emailTemplates = await dataSource.manager.findBy(internal_1.EmailTemplate, {
        name: (0, typeorm_1.Not)((0, typeorm_1.ILike)(`%subject%`))
    });
    let sentEmails = [];
    for (const tenant of tenants) {
        const { id: tenantId } = tenant;
        const users = await dataSource.manager.findBy(internal_1.User, {
            tenantId
        });
        const orgs = tenantOrganizationsMap.get(tenant);
        for (const org of orgs) {
            sentEmails = await dataOperation(dataSource, sentEmails, noOfEmailsPerOrganization, org, emailTemplates, tenant, users);
        }
    }
    return sentEmails;
};
exports.createRandomEmailSent = createRandomEmailSent;
/**
 *
 */
const dataOperation = async (dataSource, sentEmails, noOfEmailsPerOrganization, organization, emailTemplates, tenant, users) => {
    for (let i = 0; i < noOfEmailsPerOrganization; i++) {
        const sentEmail = new email_history_entity_1.EmailHistory();
        sentEmail.organization = organization;
        sentEmail.email = (0, utils_1.getEmailWithPostfix)(faker_1.faker.internet.exampleEmail());
        sentEmail.emailTemplate = faker_1.faker.helpers.arrayElement(emailTemplates);
        sentEmail.name = sentEmail.emailTemplate.name.split('/')[0];
        sentEmail.content = sentEmail.emailTemplate.hbs;
        sentEmail.tenant = tenant;
        sentEmail.user = faker_1.faker.helpers.arrayElement(users);
        sentEmails.push(sentEmail);
    }
    await dataSource.manager.save(sentEmails);
    return sentEmails;
};
//# sourceMappingURL=email-history.seed.js.map
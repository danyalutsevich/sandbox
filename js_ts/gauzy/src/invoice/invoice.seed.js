"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomInvoice = exports.createDefaultInvoice = void 0;
const invoice_entity_1 = require("./invoice.entity");
const faker_1 = require("@faker-js/faker");
const moment_1 = __importDefault(require("moment"));
const underscore_1 = require("underscore");
const index_1 = require("../../plugins/contracts/dist/index");
const internal_1 = require("./../core/entities/internal");
const random_seed_config_1 = require("./../core/seeds/random-seed-config");
const createDefaultInvoice = async (dataSource, tenant, organizations, noOfInvoicePerOrganization) => {
    const invoices = [];
    const { id: tenantId } = tenant;
    for await (const organization of organizations) {
        const { id: organizationId } = organization;
        const tags = await dataSource.manager.findBy(internal_1.Tag, {
            organizationId,
            tenantId
        });
        const organizationContacts = await dataSource.manager.findBy(internal_1.OrganizationContact, {
            tenantId,
            organizationId
        });
        for (let i = 0; i < noOfInvoicePerOrganization; i++) {
            const invoice = await generateInvoice(dataSource, tenant, organization, tags, organizationContacts);
            invoices.push(invoice);
        }
    }
    await dataSource.manager.save(invoices);
};
exports.createDefaultInvoice = createDefaultInvoice;
const createRandomInvoice = async (dataSource, tenants, tenantOrganizationsMap, noOfInvoicePerOrganization) => {
    for (const tenant of tenants) {
        const { id: tenantId } = tenant;
        const organizations = tenantOrganizationsMap.get(tenant);
        const invoices = [];
        for await (const organization of organizations) {
            const { id: organizationId } = organization;
            const tags = await dataSource.manager.findBy(internal_1.Tag, {
                organizationId
            });
            const organizationContacts = await dataSource.manager.findBy(internal_1.OrganizationContact, {
                organizationId,
                tenantId
            });
            for (let i = 0; i < noOfInvoicePerOrganization; i++) {
                const invoice = await generateInvoice(dataSource, tenant, organization, tags, organizationContacts);
                invoices.push(invoice);
            }
        }
        await dataSource.manager.save(invoices);
    }
};
exports.createRandomInvoice = createRandomInvoice;
const generateInvoice = async (dataSource, tenant, organization, tags, organizationContacts) => {
    const invoice = new invoice_entity_1.Invoice();
    invoice.invoiceNumber = faker_1.faker.number.int({ min: 111111111111, max: 999999999999 });
    invoice.tags = (0, underscore_1.chain)(tags)
        .shuffle()
        .take(faker_1.faker.number.int({ min: 1, max: 3 }))
        .values()
        .value();
    const invoiceDate = faker_1.faker.date.between({
        from: faker_1.faker.date.past({ years: 0.3 }),
        to: new Date()
    });
    invoice.invoiceDate = (0, moment_1.default)(invoiceDate).startOf('day').toDate();
    const dueDate = faker_1.faker.date.between({
        from: new Date(),
        to: faker_1.faker.date.future({ years: 0.3 })
    });
    invoice.dueDate = (0, moment_1.default)(dueDate).startOf('day').toDate();
    if (organizationContacts.length) {
        invoice.organizationContactId = faker_1.faker.helpers.arrayElement(organizationContacts).id;
    }
    invoice.sentTo = organization.id;
    invoice.fromOrganization = organization;
    invoice.toContact = faker_1.faker.helpers.arrayElement(organizationContacts);
    invoice.currency = organization.currency;
    invoice.discountValue = faker_1.faker.number.int({ min: 1, max: 10 });
    invoice.paid = faker_1.faker.datatype.boolean();
    invoice.tax = faker_1.faker.number.int({ min: 1, max: 10 });
    invoice.tax2 = faker_1.faker.number.int({ min: 1, max: 10 });
    invoice.terms = 'Term and Setting Applied';
    invoice.isEstimate = faker_1.faker.datatype.boolean();
    if (invoice.isEstimate) {
        invoice.isAccepted = faker_1.faker.datatype.boolean();
        invoice.status = faker_1.faker.helpers.arrayElement(Object.values(index_1.EstimateStatusTypesEnum));
    }
    else {
        invoice.status = faker_1.faker.helpers.arrayElement(Object.values(index_1.InvoiceStatusTypesEnum));
    }
    invoice.discountType = faker_1.faker.helpers.arrayElement(Object.values(index_1.DiscountTaxTypeEnum));
    invoice.taxType = faker_1.faker.helpers.arrayElement(Object.values(index_1.DiscountTaxTypeEnum));
    invoice.tax2Type = faker_1.faker.helpers.arrayElement(Object.values(index_1.DiscountTaxTypeEnum));
    invoice.invoiceType = faker_1.faker.helpers.arrayElement(Object.values(index_1.InvoiceTypeEnum));
    invoice.organization = organization;
    invoice.tenant = tenant;
    invoice.isArchived = false;
    invoice.historyRecords = await generateInvoiceHistory(dataSource, tenant, organization, invoice);
    return invoice;
};
/**
* Updates invoice estimate records history
* @param dataSource
* @param tenant
* @param organization
* @param invoice
*/
const generateInvoiceHistory = async (dataSource, tenant, organization, invoice) => {
    const historyRecords = [];
    const { id: tenantId } = tenant;
    const users = await dataSource.manager.findBy(internal_1.User, {
        tenantId
    });
    historyRecords.push(new internal_1.InvoiceEstimateHistory({
        user: faker_1.faker.helpers.arrayElement(users),
        action: invoice.isEstimate ? 'Estimated Added' : 'Invoice Added',
        tenant,
        organization
    }));
    for (let i = 0; i < faker_1.faker.number.int({
        min: 2,
        max: random_seed_config_1.randomSeedConfig.numberOfInvoiceHistoryPerInvoice
    }); i++) {
        historyRecords.push(new internal_1.InvoiceEstimateHistory({
            user: faker_1.faker.helpers.arrayElement(users),
            action: faker_1.faker.person.jobTitle(),
            tenant,
            organization
        }));
    }
    return historyRecords;
};
//# sourceMappingURL=invoice.seed.js.map
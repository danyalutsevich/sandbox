"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomInvoiceItem = exports.createDefaultInvoiceItem = void 0;
const invoice_item_entity_1 = require("./invoice-item.entity");
const faker_1 = require("@faker-js/faker");
const index_1 = require("../../plugins/contracts/dist/index");
const internal_1 = require("./../core/entities/internal");
const createDefaultInvoiceItem = async (dataSource, tenant, organizations, numberOfInvoiceItemPerInvoice) => {
    for await (const organization of organizations) {
        const invoiceItems = await invoiceItemForInvoiceType(dataSource, tenant, organization, numberOfInvoiceItemPerInvoice);
        await dataSource.manager.save(invoiceItems);
    }
};
exports.createDefaultInvoiceItem = createDefaultInvoiceItem;
const createRandomInvoiceItem = async (dataSource, tenants, tenantOrganizationsMap, numberOfInvoiceItemPerInvoice) => {
    for await (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        for await (const organization of organizations) {
            const invoiceItems = await invoiceItemForInvoiceType(dataSource, tenant, organization, numberOfInvoiceItemPerInvoice);
            await dataSource.manager.save(invoiceItems);
        }
    }
};
exports.createRandomInvoiceItem = createRandomInvoiceItem;
async function invoiceItemForInvoiceType(dataSource, tenant, organization, numberOfInvoiceItemPerInvoice) {
    const { id: tenantId } = tenant;
    const { id: organizationId } = organization;
    const where = {
        tenantId: tenantId,
        organizationId: organizationId
    };
    const employees = await dataSource.manager.find(internal_1.Employee, { where });
    const projects = await dataSource.manager.find(internal_1.OrganizationProject, { where });
    const tasks = await dataSource.manager.find(internal_1.Task, { where });
    const products = await dataSource.manager.find(internal_1.Product, { where });
    const expenses = await dataSource.manager.find(internal_1.Expense, { where });
    const invoices = await dataSource.manager.find(internal_1.Invoice, { where });
    const invoiceItems = [];
    for await (const invoice of invoices) {
        let totalValue = 0;
        for (let i = 0; i < faker_1.faker.number.int({ min: 1, max: numberOfInvoiceItemPerInvoice }); i++) {
            const invoiceItem = new invoice_item_entity_1.InvoiceItem();
            invoiceItem.description = faker_1.faker.random.words();
            invoiceItem.price = faker_1.faker.number.int({ min: 10, max: 50 });
            invoiceItem.quantity = faker_1.faker.number.int({ min: 10, max: 20 });
            invoiceItem.totalValue = invoiceItem.price * invoiceItem.quantity;
            invoiceItem.invoice = invoice;
            switch (invoice.invoiceType) {
                case index_1.InvoiceTypeEnum.BY_EMPLOYEE_HOURS:
                    invoiceItem.employee = faker_1.faker.helpers.arrayElement(employees);
                    break;
                case index_1.InvoiceTypeEnum.BY_PROJECT_HOURS:
                    invoiceItem.project = faker_1.faker.helpers.arrayElement(projects);
                    break;
                case index_1.InvoiceTypeEnum.BY_TASK_HOURS:
                    invoiceItem.task = faker_1.faker.helpers.arrayElement(tasks);
                    break;
                case index_1.InvoiceTypeEnum.BY_PRODUCTS:
                    invoiceItem.product = faker_1.faker.helpers.arrayElement(products);
                    break;
                case index_1.InvoiceTypeEnum.BY_EXPENSES:
                    invoiceItem.expense = faker_1.faker.helpers.arrayElement(expenses);
                    break;
            }
            invoiceItem.applyDiscount = faker_1.faker.datatype.boolean();
            invoiceItem.applyTax = faker_1.faker.datatype.boolean();
            invoiceItem.tenant = tenant;
            invoiceItem.organization = organization;
            totalValue += invoiceItem.totalValue;
            invoiceItems.push(invoiceItem);
        }
        invoice.totalValue = totalValue;
        await dataSource.manager.save(invoice);
    }
    return invoiceItems;
}
//# sourceMappingURL=invoice-item.seed.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomPayment = exports.createDefaultPayment = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const payment_entity_1 = require("./payment.entity");
const faker_1 = require("@faker-js/faker");
const moment_1 = __importDefault(require("moment"));
const index_2 = require("../../plugins/config/dist/index");
const internal_1 = require("./../core/entities/internal");
const underscore_1 = __importDefault(require("underscore"));
const createDefaultPayment = async (dataSource, tenant, employees, organizations) => {
    const payments = [];
    const { id: tenantId } = tenant;
    const users = await dataSource.manager.findBy(internal_1.User, {
        tenantId
    });
    for (const organization of organizations) {
        const { id: organizationId } = organization;
        const projects = await dataSource.manager.findBy(internal_1.OrganizationProject, {
            tenantId,
            organizationId
        });
        const tags = await dataSource.manager.findBy(internal_1.Tag, {
            tenantId,
            organizationId
        });
        const invoices = await dataSource.manager.find(internal_1.Invoice, {
            where: {
                tenantId,
                organizationId,
                isEstimate: false
            },
            relations: ['toContact']
        });
        for (const invoice of invoices) {
            const payment = new payment_entity_1.Payment();
            payment.invoice = invoice;
            payment.paymentDate = (0, moment_1.default)(faker_1.faker.date.between({
                from: new Date(),
                to: (0, moment_1.default)(new Date()).add(1, 'month').toDate()
            }))
                .startOf('day')
                .toDate();
            payment.amount = faker_1.faker.number.int({
                min: 500,
                max: 5000
            });
            payment.note = faker_1.faker.person.jobDescriptor();
            payment.currency = organization.currency || index_2.environment.defaultCurrency;
            payment.paymentMethod = faker_1.faker.helpers.arrayElement(Object.keys(index_1.PaymentMethodEnum));
            payment.overdue = faker_1.faker.datatype.boolean();
            payment.organization = organization;
            payment.tenant = tenant;
            payment.tags = underscore_1.default.chain(tags)
                .shuffle()
                .take(faker_1.faker.number.int({ min: 1, max: 3 }))
                .values()
                .value();
            payment.organizationContact = invoice.toContact;
            payment.employeeId = faker_1.faker.helpers.arrayElement(employees).id;
            payment.recordedBy = faker_1.faker.helpers.arrayElement(users);
            const project = faker_1.faker.helpers.arrayElement(projects);
            if (project) {
                payment.projectId = project.id;
            }
            payments.push(payment);
        }
    }
    await dataSource.manager.save(payments);
    return payments;
};
exports.createDefaultPayment = createDefaultPayment;
const createRandomPayment = async (dataSource, tenants, tenantOrganizationsMap, organizationEmployeesMap) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, Payment  will not be created');
        return;
    }
    for (const tenant of tenants) {
        const { id: tenantId } = tenant;
        const tenantOrgs = tenantOrganizationsMap.get(tenant);
        const users = await dataSource.manager.findBy(internal_1.User, {
            tenantId
        });
        const payments1 = [];
        const payments2 = [];
        for (const organization of tenantOrgs) {
            const tenantEmployees = organizationEmployeesMap.get(organization);
            const { id: organizationId } = organization;
            const projects = await dataSource.manager.findBy(internal_1.OrganizationProject, {
                organizationId,
                tenantId
            });
            const tags = await dataSource.manager.findBy(internal_1.Tag, {
                organizationId,
                tenantId
            });
            const invoices = await dataSource.manager.find(internal_1.Invoice, {
                where: {
                    organizationId,
                    tenantId,
                    isEstimate: false
                },
                relations: ['toContact']
            });
            let count = 0;
            for (const invoice of invoices) {
                const payment = new payment_entity_1.Payment();
                payment.invoice = invoice;
                payment.paymentDate = (0, moment_1.default)(faker_1.faker.date.between({
                    from: new Date(),
                    to: (0, moment_1.default)(new Date()).add(1, 'month').toDate()
                }))
                    .startOf('day')
                    .toDate();
                payment.amount = faker_1.faker.number.int({
                    min: 500,
                    max: 5000
                });
                payment.note = faker_1.faker.person.jobDescriptor();
                payment.currency = organization.currency || index_2.environment.defaultCurrency;
                payment.paymentMethod = faker_1.faker.helpers.arrayElement(Object.keys(index_1.PaymentMethodEnum));
                payment.overdue = faker_1.faker.datatype.boolean();
                payment.organization = organization;
                payment.tenant = tenant;
                payment.tags = underscore_1.default.chain(tags)
                    .shuffle()
                    .take(faker_1.faker.number.int({ min: 1, max: 3 }))
                    .values()
                    .value();
                payment.organizationContact = invoice.toContact;
                payment.employeeId = faker_1.faker.helpers.arrayElement(tenantEmployees).id;
                payment.recordedBy = faker_1.faker.helpers.arrayElement(users);
                const project = faker_1.faker.helpers.arrayElement(projects);
                if (project) {
                    payment.projectId = project.id;
                }
                if (count % 2 === 0) {
                    payments1.push(payment);
                }
                else {
                    payments2.push(payment);
                }
                count++;
            }
        }
        await dataSource.manager.save(payments1);
        await dataSource.manager.save(payments2);
    }
};
exports.createRandomPayment = createRandomPayment;
//# sourceMappingURL=payment.seed.js.map
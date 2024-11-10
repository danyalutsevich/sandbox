"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultEmployees = exports.createRandomEmployees = exports.createDefaultEmployees = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const faker_1 = require("@faker-js/faker");
const index_2 = require("../../plugins/config/dist/index");
const moment_1 = __importDefault(require("moment"));
const internal_1 = require("./../core/entities/internal");
const organization_seed_1 = require("./../organization/organization.seed");
const createDefaultEmployees = async (dataSource, tenant, organization, users, defaultEmployees) => {
    const employees = [];
    for (const user of users) {
        const employee = new internal_1.Employee();
        employee.organization = organization;
        employee.tenant = tenant;
        employee.user = user;
        employee.employeeLevel = defaultEmployees.find((e) => e.email === employee.user.email).employeeLevel;
        employee.startedWorkOn = getDate(defaultEmployees.find((e) => e.email === employee.user.email).startedWorkOn);
        employee.endWork = getDate(defaultEmployees.find((e) => e.email === employee.user.email).endWork);
        // TODO: check below value as its correct or not, and into frontend too
        employee.payPeriod = faker_1.faker.helpers.arrayElement(Object.keys(index_1.PayPeriodEnum));
        employee.billRateValue = faker_1.faker.number.int({ min: 15, max: 40 });
        employee.billRateCurrency = organization.currency || index_2.environment.defaultCurrency;
        employee.minimumBillingRate = faker_1.faker.number.int({ min: 5, max: employee.billRateValue - 1 });
        employee.reWeeklyLimit = faker_1.faker.number.int({ min: 10, max: 40 });
        employees.push(employee);
    }
    await insertEmployees(dataSource, employees);
    return employees;
};
exports.createDefaultEmployees = createDefaultEmployees;
const createRandomEmployees = async (dataSource, tenants, tenantOrganizationsMap, organizationUsersMap) => {
    const organizationEmployeesMap = new Map();
    for await (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        for await (const organization of organizations) {
            const employees = [];
            const users = organizationUsersMap.get(organization);
            for await (const user of users) {
                const employee = new internal_1.Employee();
                employee.organization = organization;
                employee.tenant = tenant;
                employee.user = user;
                employee.isActive = true;
                employee.endWork = null;
                employee.startedWorkOn = new Date((0, moment_1.default)(faker_1.faker.date.past()).format('YYYY-MM-DD hh:mm:ss'));
                employee.payPeriod = faker_1.faker.helpers.arrayElement(Object.keys(index_1.PayPeriodEnum));
                employee.billRateValue = faker_1.faker.number.int({ min: 15, max: 40 });
                employee.billRateCurrency = organization.currency || index_2.environment.defaultCurrency;
                employee.reWeeklyLimit = faker_1.faker.number.int({ min: 10, max: 40 });
                employees.push(employee);
            }
            organizationEmployeesMap.set(organization, employees);
            await insertEmployees(dataSource, employees);
        }
    }
    return organizationEmployeesMap;
};
exports.createRandomEmployees = createRandomEmployees;
const insertEmployees = async (dataSource, employees) => {
    return await dataSource.manager.save(employees);
};
const getDate = (dateString) => {
    if (dateString) {
        const date = new Date(dateString);
        return date;
    }
    return null;
};
/*
 * Default employees
 */
const getDefaultEmployees = async (dataSource, tenant) => {
    const organization = await (0, organization_seed_1.getDefaultOrganization)(dataSource, tenant);
    const employees = await dataSource.getRepository(internal_1.Employee).find({
        where: {
            tenantId: tenant.id,
            organizationId: organization.id
        },
        relations: {
            tenant: true,
            organization: true
        }
    });
    return employees;
};
exports.getDefaultEmployees = getDefaultEmployees;
//# sourceMappingURL=employee.seed.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomOrganizationRecurringExpense = exports.createDefaultOrganizationRecurringExpense = void 0;
const organization_recurring_expense_entity_1 = require("./organization-recurring-expense.entity");
const faker_1 = require("@faker-js/faker");
const index_1 = require("../../plugins/contracts/dist/index");
const moment_1 = __importDefault(require("moment"));
const index_2 = require("../../plugins/config/dist/index");
const createDefaultOrganizationRecurringExpense = async (dataSource, tenant, defaultOrganization) => {
    if (!defaultOrganization) {
        console.warn('Warning: defaultOrganization not found, default organization recurring expense not be created');
        return;
    }
    let mapOrganizationRecurringExpense = [];
    const expenseCategories = Object.keys(index_1.RecurringExpenseDefaultCategoriesEnum);
    mapOrganizationRecurringExpense = await dataOperation(dataSource, tenant, mapOrganizationRecurringExpense, expenseCategories, defaultOrganization);
    return mapOrganizationRecurringExpense;
};
exports.createDefaultOrganizationRecurringExpense = createDefaultOrganizationRecurringExpense;
const createRandomOrganizationRecurringExpense = async (dataSource, tenants, tenantOrganizationsMap) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, organization recurring expense not be created');
        return;
    }
    let mapOrganizationRecurringExpense = [];
    const expenseCategories = Object.keys(index_1.RecurringExpenseDefaultCategoriesEnum);
    for (const tenant of tenants) {
        const tenantOrganization = tenantOrganizationsMap.get(tenant);
        for (const tenantOrg of tenantOrganization) {
            mapOrganizationRecurringExpense = await dataOperation(dataSource, tenant, mapOrganizationRecurringExpense, expenseCategories, tenantOrg);
        }
    }
    return mapOrganizationRecurringExpense;
};
exports.createRandomOrganizationRecurringExpense = createRandomOrganizationRecurringExpense;
const dataOperation = async (dataSource, tenant, mapOrganizationRecurringExpense, expenseCategories, tenantOrg) => {
    for (const expenseCategory of expenseCategories) {
        const organization = new organization_recurring_expense_entity_1.OrganizationRecurringExpense();
        const startDate = faker_1.faker.date.past();
        const endDate = (0, moment_1.default)(startDate).add(1, 'months').toDate();
        organization.organization = tenantOrg;
        organization.organizationId = tenantOrg.id;
        organization.tenant = tenant;
        organization.startDay = startDate.getDate();
        organization.startMonth = startDate.getMonth() + 1;
        organization.startYear = startDate.getFullYear();
        organization.startDate = startDate;
        organization.endDay = endDate.getDate();
        organization.endMonth = endDate.getMonth();
        organization.endYear = endDate.getFullYear();
        organization.endDate = endDate;
        organization.categoryName = expenseCategory;
        organization.value = faker_1.faker.number.int(9999);
        organization.currency = tenantOrg.currency || index_2.environment.defaultCurrency;
        mapOrganizationRecurringExpense.push(organization);
    }
    await dataSource.manager.save(mapOrganizationRecurringExpense);
    return mapOrganizationRecurringExpense;
};
//# sourceMappingURL=organization-recurring-expense.seed.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomExpenseCategories = exports.createExpenseCategories = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const expense_category_entity_1 = require("./expense-category.entity");
const createExpenseCategories = async (dataSource, tenant, organizations) => {
    let defaultExpenseCategories = [];
    for (const organization of organizations) {
        const categories = Object.values(index_1.ExpenseCategoriesEnum).map((name) => {
            const category = new expense_category_entity_1.ExpenseCategory();
            category.name = name;
            category.organization = organization;
            category.tenant = tenant;
            return category;
        });
        defaultExpenseCategories = [...defaultExpenseCategories, ...categories];
    }
    return insertExpenseCategories(dataSource, defaultExpenseCategories);
};
exports.createExpenseCategories = createExpenseCategories;
const createRandomExpenseCategories = async (dataSource, tenants, tenantOrganizationMap) => {
    let expenseCategories = [];
    const expenseCategoryMap = new Map();
    for (const tenant of tenants) {
        const organizations = tenantOrganizationMap.get(tenant);
        (organizations || []).forEach((organization) => {
            const categories = Object.values(index_1.ExpenseCategoriesEnum).map((name) => {
                const category = new expense_category_entity_1.ExpenseCategory();
                category.name = name;
                category.organization = organization;
                category.tenant = tenant;
                return category;
            });
            expenseCategoryMap.set(organization, categories);
            expenseCategories = [...expenseCategories, ...categories];
        });
    }
    await insertExpenseCategories(dataSource, expenseCategories);
    return expenseCategoryMap;
};
exports.createRandomExpenseCategories = createRandomExpenseCategories;
const insertExpenseCategories = async (dataSource, expenseCategories) => {
    return await dataSource.manager.save(expenseCategories);
};
//# sourceMappingURL=expense-categories.seed.js.map
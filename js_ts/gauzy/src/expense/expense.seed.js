"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomExpenses = exports.createDefaultExpenses = void 0;
const faker_1 = require("@faker-js/faker");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const moment_1 = __importDefault(require("moment"));
const index_1 = require("../../plugins/config/dist/index");
const internal_1 = require("./../core/entities/internal");
const createDefaultExpenses = async (dataSource, organizations, tenant, employees, categories, organizationVendors) => {
    if (!categories) {
        console.warn('Warning: Categories not found, default expenses would not be created');
        return;
    }
    if (!organizationVendors) {
        console.warn('Warning: organizationVendors not found, default expenses would not be created');
        return;
    }
    let filePath = path.join(__dirname, ...['expense-seed-data', 'expenses-data.csv']);
    try {
        filePath = fs.existsSync(filePath)
            ? filePath
            : `./expense-seed-data/expenses-data.csv`;
    }
    catch (error) {
        console.error('Cannot find expense data csv');
    }
    const expensesFromFile = [];
    let defaultExpenses = [];
    for (const organization of organizations) {
        fs.createReadStream(filePath)
            .pipe((0, csv_parser_1.default)())
            .on('data', (data) => expensesFromFile.push(data))
            .on('end', async () => {
            defaultExpenses = expensesFromFile.map((seedExpense) => {
                const expense = new internal_1.Expense();
                const foundEmployee = employees.find((emp) => emp.user.email === seedExpense.email);
                const foundCategory = (categories || []).find((category) => seedExpense.categoryName === category.name);
                const foundVendor = (organizationVendors || []).find((vendor) => seedExpense.vendorName === vendor.name);
                expense.employee = foundEmployee;
                expense.organization = organization;
                expense.tenant = tenant;
                expense.amount = Math.abs(seedExpense.amount);
                expense.vendor = foundVendor;
                expense.category = foundCategory;
                expense.currency = seedExpense.currency || index_1.environment.defaultCurrency;
                expense.notes = seedExpense.notes;
                expense.valueDate = (0, moment_1.default)(faker_1.faker.date.between({
                    from: (0, moment_1.default)().subtract(3, 'months').calendar(),
                    to: (0, moment_1.default)().add(10, 'days').calendar()
                }))
                    .startOf('day')
                    .toDate();
                return expense;
            });
            await insertExpense(dataSource, defaultExpenses);
        });
    }
    return expensesFromFile;
};
exports.createDefaultExpenses = createDefaultExpenses;
const createRandomExpenses = async (dataSource, tenants, tenantOrganizationsMap, organizationEmployeesMap, organizationVendorsMap, categoriesMap) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, RandomExpenses will not be created');
        return;
    }
    if (!categoriesMap) {
        console.warn('Warning: categoriesMap not found, RandomExpenses will not be created');
        return;
    }
    if (!organizationVendorsMap) {
        console.warn('Warning: organizationVendorsMap not found, RandomExpenses will not be created');
        return;
    }
    const notesArray = [
        'Windows 10',
        'MultiSport Card',
        'Angular Masterclass',
        'Drive',
        'Rent for September'
    ];
    for (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        for (const organization of organizations) {
            const employees = organizationEmployeesMap.get(organization);
            for (const employee of employees) {
                const organizationVendors = organizationVendorsMap.get(employee.organization);
                const categories = categoriesMap.get(employee.organization);
                const randomExpenses = [];
                for (let index = 0; index < 100; index++) {
                    const expense = new internal_1.Expense();
                    const currentIndex = faker_1.faker.number.int({
                        min: 0,
                        max: index % 5
                    });
                    expense.organization = employee.organization;
                    expense.tenant = tenant;
                    expense.employee = employee;
                    expense.amount = faker_1.faker.number.int({ min: 10, max: 999 });
                    expense.vendor =
                        organizationVendors[currentIndex % organizationVendors.length];
                    expense.category = categories[currentIndex % categories.length];
                    expense.currency = employee.organization.currency || index_1.environment.defaultCurrency;
                    expense.notes = notesArray[currentIndex];
                    expense.valueDate = (0, moment_1.default)(faker_1.faker.date.between({
                        from: (0, moment_1.default)().subtract(3, 'months').calendar(),
                        to: (0, moment_1.default)().add(10, 'days').calendar()
                    }))
                        .startOf('day')
                        .toDate();
                    randomExpenses.push(expense);
                }
                await insertExpense(dataSource, randomExpenses);
            }
        }
    }
    return;
};
exports.createRandomExpenses = createRandomExpenses;
const insertExpense = async (dataSource, expenses) => {
    await dataSource.manager.save(expenses);
};
//# sourceMappingURL=expense.seed.js.map
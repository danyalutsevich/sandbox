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
exports.createRandomIncomes = exports.createDefaultIncomes = void 0;
const faker_1 = require("@faker-js/faker");
const index_1 = require("../../plugins/contracts/dist/index");
const fs = __importStar(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const path = __importStar(require("path"));
const moment_1 = __importDefault(require("moment"));
const index_2 = require("../../plugins/config/dist/index");
const internal_1 = require("./../core/entities/internal");
const utils_1 = require("./../core/utils");
const underscore_1 = require("underscore");
const createDefaultIncomes = async (dataSource, tenant, organizations, employees) => {
    let filePath = path.join(__dirname, ...['income-seed-data', 'income-data.csv']);
    try {
        filePath = fs.existsSync(filePath)
            ? filePath
            : `./income-seed-data/income-data.csv`;
    }
    catch (error) {
        console.error('Cannot find income data csv');
    }
    const incomeFromFile = [];
    let defaultIncomes = [];
    const { id: tenantId } = tenant;
    for await (const organization of organizations) {
        const { id: organizationId } = organization;
        const tags = await dataSource.manager.findBy(internal_1.Tag, {
            organizationId
        });
        fs.createReadStream(filePath)
            .pipe((0, csv_parser_1.default)())
            .on('data', (data) => incomeFromFile.push(data))
            .on('end', async () => {
            const incomes = [];
            for await (const seedIncome of incomeFromFile) {
                const income = new internal_1.Income();
                income.employee = employees.find((emp) => emp.user.email === seedIncome.email);
                income.organization = organization;
                income.tenant = tenant;
                income.amount = seedIncome.amount;
                income.currency = seedIncome.currency || index_2.environment.defaultCurrency;
                income.notes = seedIncome.notes;
                income.valueDate = (0, moment_1.default)(faker_1.faker.date.between({
                    from: (0, moment_1.default)().subtract(3, 'months').calendar(),
                    to: (0, moment_1.default)().add(10, 'days').calendar()
                }))
                    .startOf('day')
                    .toDate();
                const payload = {
                    name: `Client ${seedIncome.clientName}`,
                    tenantId: tenantId,
                    organizationId: organizationId,
                    contactType: index_1.ContactType.CLIENT,
                    budgetType: index_1.OrganizationContactBudgetTypeEnum.HOURS
                };
                income.client = await dataSource.manager.findOne(internal_1.OrganizationContact, {
                    where: {
                        ...payload
                    }
                });
                if (!income.client) {
                    /**
                     * Create income related client
                     */
                    income.client = await dataSource.manager.save(new internal_1.OrganizationContact({
                        ...payload,
                        imageUrl: (0, utils_1.getDummyImage)(330, 300, (seedIncome.clientName).charAt(0).toUpperCase())
                    }));
                }
                income.tags = (0, underscore_1.chain)(tags)
                    .shuffle()
                    .take(faker_1.faker.number.int({ min: 1, max: 3 }))
                    .values()
                    .value();
                incomes.push(income);
            }
            await insertIncome(dataSource, incomes);
        });
    }
    return defaultIncomes;
};
exports.createDefaultIncomes = createDefaultIncomes;
const createRandomIncomes = async (dataSource, tenants, tenantOrganizationsMap, organizationEmployeesMap) => {
    const notes = [
        'Great job!',
        'Well done!',
        'Nice!',
        'Done',
        'Great job!'
    ];
    for await (const tenant of tenants || []) {
        const organizations = tenantOrganizationsMap.get(tenant);
        for await (const organization of organizations) {
            const incomes = [];
            const { id: organizationId } = organization;
            const { id: tenantId } = tenant;
            const organizationContacts = await dataSource.manager.findBy(internal_1.OrganizationContact, {
                tenantId,
                organizationId
            });
            const tags = await dataSource.manager.findBy(internal_1.Tag, {
                tenantId,
                organizationId
            });
            const employees = organizationEmployeesMap.get(organization);
            for await (const employee of employees || []) {
                for (let index = 0; index < 100; index++) {
                    const income = new internal_1.Income();
                    const currentIndex = faker_1.faker.number.int({
                        min: 0,
                        max: index % 5
                    });
                    income.organization = organization;
                    income.tenant = tenant;
                    income.employee = employee;
                    income.amount = faker_1.faker.number.int({ min: 10, max: 9999 });
                    if (organizationContacts.length) {
                        income.client = faker_1.faker.helpers.arrayElement(organizationContacts);
                    }
                    income.currency = employee.organization.currency || index_2.environment.defaultCurrency;
                    income.valueDate = (0, moment_1.default)(faker_1.faker.date.between({
                        from: (0, moment_1.default)().subtract(3, 'months').calendar(),
                        to: (0, moment_1.default)().add(10, 'days').calendar()
                    }))
                        .startOf('day')
                        .toDate();
                    income.notes = notes[currentIndex];
                    income.tags = (0, underscore_1.chain)(tags)
                        .shuffle()
                        .take(faker_1.faker.number.int({ min: 1, max: 3 }))
                        .values()
                        .value();
                    incomes.push(income);
                }
            }
            await insertIncome(dataSource, incomes);
        }
    }
    return;
};
exports.createRandomIncomes = createRandomIncomes;
const insertIncome = async (dataSource, incomes) => {
    await dataSource.manager.save(incomes);
};
//# sourceMappingURL=income.seed.js.map
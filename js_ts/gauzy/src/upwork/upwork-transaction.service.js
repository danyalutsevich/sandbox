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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpworkTransactionService = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const employee_service_1 = require("../employee/employee.service");
const user_service_1 = require("../user/user.service");
const fs = __importStar(require("fs"));
const fse = __importStar(require("fs-extra"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const income_create_command_1 = require("../income/commands/income.create.command");
const expense_create_command_1 = require("../expense/commands/expense.create.command");
const organization_vendor_service_1 = require("../organization-vendor/organization-vendor.service");
const organization_contact_service_1 = require("../organization-contact/organization-contact.service");
const expense_categories_service_1 = require("../expense-categories/expense-categories.service");
const index_1 = require("../../plugins/contracts/dist/index");
const expense_entity_1 = require("../expense/expense.entity");
const income_entity_1 = require("../income/income.entity");
const core_1 = require("../core");
const uuid_1 = require("uuid");
const context_1 = require("../core/context");
let UpworkTransactionService = exports.UpworkTransactionService = class UpworkTransactionService {
    _userService;
    _employeeService;
    _orgVendorService;
    _orgClientService;
    _expenseCategoryService;
    commandBus;
    commandBusMapper = {
        [index_1.IncomeTypeEnum.HOURLY]: {
            command: ({ dto, client }) => new income_create_command_1.IncomeCreateCommand({
                ...dto,
                clientName: client.name,
                clientId: client.id
            })
        },
        [index_1.ExpenseCategoriesEnum.SERVICE_FEE]: {
            command: ({ dto, category, vendor }) => new expense_create_command_1.ExpenseCreateCommand({
                ...dto,
                vendor,
                category
            })
        }
    };
    constructor(_userService, _employeeService, _orgVendorService, _orgClientService, _expenseCategoryService, commandBus) {
        this._userService = _userService;
        this._employeeService = _employeeService;
        this._orgVendorService = _orgVendorService;
        this._orgClientService = _orgClientService;
        this._expenseCategoryService = _expenseCategoryService;
        this.commandBus = commandBus;
    }
    async handleTransactions(file, { organizationId }) {
        const uuid = (0, uuid_1.v4)();
        const dirPath = `./apps/api/src/app/integrations/upwork/csv/${uuid}`;
        const csvData = file.buffer.toString();
        const filePath = `${dirPath}/${file.originalname}`;
        let results = [];
        fs.mkdirSync(dirPath, { recursive: true });
        fs.writeFileSync(filePath, csvData);
        const csvReader = fs
            .createReadStream(filePath)
            .pipe((0, csv_parser_1.default)())
            .on('data', (data) => (results = results.concat(data)));
        const tenantId = context_1.RequestContext.currentTenantId();
        return new Promise((resolve, reject) => {
            csvReader.on('end', async () => {
                fse.removeSync(dirPath);
                const transactions = results
                    .filter((result) => result.Type === index_1.IncomeTypeEnum.HOURLY ||
                    result.Type === index_1.ExpenseCategoriesEnum.SERVICE_FEE)
                    .map(async (result) => {
                    const { Date: date, Amount, Freelancer, Currency, Team } = result;
                    const [firstName, lastName] = Freelancer.split(' ');
                    const { record: user } = await this._findRecordOrThrow(this._userService, {
                        where: {
                            firstName,
                            lastName
                        }
                    }, `User: ${Freelancer} not found`);
                    const { record: employee } = await this._findRecordOrThrow(this._employeeService, { where: { user, organizationId, tenantId } }, `Employee ${Freelancer} not found`);
                    const { record: category } = await this._findRecordOrThrow(this._expenseCategoryService, {
                        where: {
                            name: index_1.ExpenseCategoriesEnum.SERVICE_FEE,
                            organizationId,
                            tenantId
                        }
                    }, `Category: ${index_1.ExpenseCategoriesEnum.SERVICE_FEE} not found`);
                    const { record: vendor } = await this._findRecordOrThrow(this._orgVendorService, {
                        where: {
                            name: index_1.OrganizationVendorEnum.UPWORK,
                            organizationId,
                            tenantId
                        }
                    }, `Vendor: ${index_1.OrganizationVendorEnum.UPWORK} not found`);
                    const { record: client } = await this._findRecordOrThrow(this._orgClientService, {
                        where: { name: Team, organizationId, tenantId }
                    }, `Client: ${Team} not found`);
                    const dto = {
                        amount: Amount,
                        reference: result['Ref ID'],
                        valueDate: new Date(date),
                        employeeId: employee.id,
                        currency: Currency,
                        organizationId
                    };
                    const cmd = this.commandBusMapper[result.Type];
                    return await this.commandBus.execute(cmd.command({
                        dto,
                        client,
                        vendor,
                        category
                    }));
                });
                const processedTransactions = await Promise.all(transactions.map(core_1.reflect));
                const { rejectedTransactions, totalExpenses, totalIncomes } = this._proccessTransactions(processedTransactions);
                if (rejectedTransactions.length) {
                    const errors = rejectedTransactions.map(({ error }) => error.response.message);
                    const message = this._formatErrorMesage([...new Set(errors)], totalExpenses, totalIncomes);
                    reject(new common_1.BadRequestException(message));
                }
                resolve({ totalExpenses, totalIncomes });
            });
        });
    }
    _formatErrorMesage(errors, totalExpenses, totalIncomes) {
        return `Total succeed expenses transactions: ${totalExpenses}.
			Total succeed incomes transactions: ${totalIncomes}.
			Failed transactions: ${errors.join(', ')}
		`;
    }
    _proccessTransactions(processedTransactions) {
        const { rejectedTransactions, totalExpenses, totalIncomes } = processedTransactions.reduce((prev, current) => {
            return {
                rejectedTransactions: current.status === 'rejected'
                    ? prev.rejectedTransactions.concat(current)
                    : prev.rejectedTransactions,
                totalExpenses: current.item instanceof expense_entity_1.Expense
                    ? (prev.totalExpenses++, prev.totalExpenses)
                    : prev.totalExpenses,
                totalIncomes: current.item instanceof income_entity_1.Income
                    ? (prev.totalIncomes++, prev.totalIncomes)
                    : prev.totalIncomes
            };
        }, {
            rejectedTransactions: [],
            totalExpenses: 0,
            totalIncomes: 0
        });
        return {
            rejectedTransactions,
            totalExpenses,
            totalIncomes
        };
    }
    async _findRecordOrThrow(service, condition, errorMsg) {
        const response = await service.findOneOrFailByOptions(condition);
        if (response.success) {
            return { record: response.record };
        }
        throw new common_1.BadRequestException(errorMsg);
    }
};
exports.UpworkTransactionService = UpworkTransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        employee_service_1.EmployeeService,
        organization_vendor_service_1.OrganizationVendorService,
        organization_contact_service_1.OrganizationContactService,
        expense_categories_service_1.ExpenseCategoriesService,
        cqrs_1.CommandBus])
], UpworkTransactionService);
//# sourceMappingURL=upwork-transaction.service.js.map
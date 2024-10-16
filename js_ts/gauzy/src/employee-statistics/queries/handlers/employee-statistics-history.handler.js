"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeStatisticsHistoryQueryHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const employee_statistics_service_1 = require("../../employee-statistics.service");
const moment_1 = __importDefault(require("moment"));
const index_1 = require("../../../../plugins/contracts/dist/index");
const employee_statistics_history_query_1 = require("../employee-statistics-history.query");
/**
 * Finds income, expense history
 * for past N months of an employee a given value date.
 */
let EmployeeStatisticsHistoryQueryHandler = exports.EmployeeStatisticsHistoryQueryHandler = class EmployeeStatisticsHistoryQueryHandler {
    employeeStatisticsService;
    constructor(employeeStatisticsService) {
        this.employeeStatisticsService = employeeStatisticsService;
    }
    async execute(command) {
        const { input } = command;
        switch (input.type) {
            case index_1.EmployeeStatisticsHistoryEnum.INCOME:
            case index_1.EmployeeStatisticsHistoryEnum.BONUS_INCOME:
            case index_1.EmployeeStatisticsHistoryEnum.NON_BONUS_INCOME:
                return this._incomeHistory(input);
            case index_1.EmployeeStatisticsHistoryEnum.EXPENSES:
            case index_1.EmployeeStatisticsHistoryEnum.EXPENSES_WITHOUT_SALARY:
                return this._expenseHistory(input);
            default:
                return [];
        }
    }
    async _incomeHistory(input) {
        const { startDate = (0, moment_1.default)().startOf('month').toDate(), endDate = (0, moment_1.default)().endOf('month').toDate(), employeeId, organizationId } = input;
        // 1. Fetch employee's incomes for past N months from given date
        const { items: incomes } = await this.employeeStatisticsService.employeeIncomeInNMonths([employeeId], { startDate, endDate }, organizationId);
        const history = [];
        // 2. Populate  EmployeeStatisticsHistory
        incomes.forEach(({ amount, client, valueDate, notes, isBonus }) => {
            history.push({ valueDate, amount, notes, client, isBonus });
        });
        // 3. Filter Bonus, Non-Bonus or All incomes
        switch (input.type) {
            case index_1.EmployeeStatisticsHistoryEnum.BONUS_INCOME:
                return history.filter((income) => income.isBonus);
            case index_1.EmployeeStatisticsHistoryEnum.NON_BONUS_INCOME:
                return history.filter((income) => !income.isBonus);
            default:
                return history;
        }
    }
    async _expenseHistory(input) {
        const history = [];
        // 1. Employee One time expenses
        await this._loadEmployeeExpenses(input, history);
        // 2. Employee Recurring Expenses
        await this._loadEmployeeRecurringExpenses(input, history);
        // 3. Organization Split Expenses
        await this._loadOrganizationSplitExpenses(input, history);
        // 4. Organization Recurring Split Expenses
        await this._loadOrganizationRecurringSplitExpenses(input, history);
        // Filter out salary expenses based on input
        return input.type ===
            index_1.EmployeeStatisticsHistoryEnum.EXPENSES_WITHOUT_SALARY
            ? history.filter((stat) => !stat.isSalary)
            : history;
    }
    async _loadEmployeeExpenses(input, history) {
        const { startDate = (0, moment_1.default)().startOf('month').toDate(), endDate = (0, moment_1.default)().endOf('month').toDate(), employeeId, organizationId } = input;
        // 1. Fetch employee's  one time expenses for past N months from given date
        const { items: expenses } = await this.employeeStatisticsService.employeeExpenseInNMonths([employeeId], { startDate, endDate }, organizationId);
        // 2. Extract required attributes from the expense and populate EmployeeStatisticsHistory
        expenses.forEach(({ valueDate, amount, notes, vendor, category }) => {
            history.push({
                valueDate,
                amount,
                notes,
                vendorName: vendor.name,
                categoryName: category.name,
                isSalary: false,
                source: 'employee'
            });
        });
    }
    async _loadEmployeeRecurringExpenses(input, history) {
        const { startDate = (0, moment_1.default)().startOf('month').toDate(), endDate = (0, moment_1.default)().endOf('month').toDate(), employeeId, organizationId } = input;
        // 1. Fetch employee's  recurring expenses
        const { items: employeeRecurringExpenses } = await this.employeeStatisticsService.employeeRecurringExpenses([employeeId], { startDate, endDate }, organizationId);
        // 2. Filter recurring expenses based on input data and N Months and populate EmployeeStatisticsHistory
        employeeRecurringExpenses.forEach((expense) => {
            // Find start date based on input date and X months.
            const inputStartDate = startDate;
            /**
             * Add recurring expense from the
             * expense start date
             * OR
             * past N months to each month's expense, whichever is more recent
             */
            const requiredStartDate = expense.startDate > inputStartDate
                ? expense.startDate
                : inputStartDate;
            for (const date = new Date(requiredStartDate); date <= new Date(endDate); date.setMonth(date.getMonth() + 1)) {
                // Stop loading expense if the recurring expense has ended before input date
                if (expense.endDate && date > expense.endDate)
                    break;
                // Extract required attributes from expense and Populate EmployeeStatisticsHistory
                history.push({
                    valueDate: date,
                    amount: expense.value,
                    isRecurring: true,
                    categoryName: expense.categoryName,
                    isSalary: expense.categoryName ===
                        index_1.RecurringExpenseDefaultCategoriesEnum.SALARY
                });
            }
        });
    }
    async _loadOrganizationSplitExpenses(input, history) {
        const { startDate = (0, moment_1.default)().startOf('month').toDate(), endDate = (0, moment_1.default)().endOf('month').toDate(), employeeId, organizationId } = input;
        // 1. Fetch employee's split expenses for past N months from given date
        const splitExpensesMap = await this.employeeStatisticsService.employeeSplitExpenseInNMonths(employeeId, { startDate, endDate }, organizationId);
        // 2. Extract required attributes from the expense and populate EmployeeStatisticsHistory
        splitExpensesMap.forEach((value) => {
            value.expense.forEach(({ amount, category, valueDate }) => {
                history.push({
                    amount: Number((amount / value.splitAmong).toFixed(2)),
                    valueDate: valueDate,
                    categoryName: category.name,
                    splitExpense: {
                        originalValue: amount,
                        employeeCount: value.splitAmong
                    },
                    source: 'org'
                });
            });
        });
    }
    async _loadOrganizationRecurringSplitExpenses(input, history) {
        const { startDate = (0, moment_1.default)().startOf('month').toDate(), endDate = (0, moment_1.default)().endOf('month').toDate(), employeeId, organizationId } = input;
        // 1. Fetch employee's Organization Recurring split expenses for past N months from given date
        const splitExpensesMap = await this.employeeStatisticsService.organizationRecurringSplitExpenses(employeeId, { startDate, endDate }, organizationId);
        // 2. Extract required attributes from the expense and populate EmployeeStatisticsHistory
        splitExpensesMap.forEach((mapValue) => {
            mapValue.recurringExpense.forEach(({ value, categoryName }) => {
                history.push({
                    amount: Number((value / mapValue.splitAmong).toFixed(2)),
                    valueDate: mapValue.valueDate,
                    categoryName,
                    splitExpense: {
                        originalValue: value,
                        employeeCount: mapValue.splitAmong
                    },
                    source: 'org',
                    isRecurring: true
                });
            });
        });
    }
};
exports.EmployeeStatisticsHistoryQueryHandler = EmployeeStatisticsHistoryQueryHandler = __decorate([
    (0, cqrs_1.QueryHandler)(employee_statistics_history_query_1.EmployeeStatisticsHistoryQuery),
    __metadata("design:paramtypes", [employee_statistics_service_1.EmployeeStatisticsService])
], EmployeeStatisticsHistoryQueryHandler);
//# sourceMappingURL=employee-statistics-history.handler.js.map
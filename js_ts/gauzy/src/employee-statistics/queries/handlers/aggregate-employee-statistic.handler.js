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
exports.AggregateOrganizationQueryHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const moment_1 = __importDefault(require("moment"));
const employee_service_1 = require("../../../employee/employee.service");
const aggregate_employee_statistic_query_1 = require("../aggregate-employee-statistic.query");
const employee_statistics_service_1 = require("./../../employee-statistics.service");
/**
 * Finds income, expense, profit and bonus for all employees for the given month.
 * If month is not specified, finds from the start of time till now.
 */
let AggregateOrganizationQueryHandler = exports.AggregateOrganizationQueryHandler = class AggregateOrganizationQueryHandler {
    employeeService;
    employeeStatisticsService;
    constructor(employeeService, employeeStatisticsService) {
        this.employeeService = employeeService;
        this.employeeStatisticsService = employeeStatisticsService;
    }
    async execute(command) {
        const { input } = command;
        const { organizationId, startDate, endDate } = input;
        const { items: employees } = await this.employeeService.findWorkingEmployees(organizationId, {
            startDate,
            endDate
        }, true);
        const employeeMap = new Map();
        employees.forEach((employee) => {
            employeeMap.set(employee.id, {
                income: 0,
                expense: 0,
                bonus: 0,
                profit: 0,
                employee: {
                    id: employee.id,
                    user: employee.user
                }
            });
        });
        const months = (0, moment_1.default)(endDate).diff((0, moment_1.default)(startDate), 'months');
        // Calculate transactions for 1 month if filterDate is available,
        // TODO: last 20 years otherwise. More than one month can be very complex, since in any given month, any number of employees can be working
        const searchInput = {
            months,
            rangeDate: {
                startDate,
                endDate
            }
        };
        if (employees.length > 0) {
            await this._loadAllData(searchInput, employeeMap, organizationId);
        }
        const employeeStats = [...employeeMap.values()];
        const total = employeeStats.reduce(this._aggregateEmployeeStats, { income: 0, expense: 0, bonus: 0, profit: 0 });
        return {
            total,
            employees: employeeStats,
            chart: await this._loadChartData(employees, searchInput, organizationId)
        };
    }
    async _loadChartData(employees, searchInput, organizationId) {
        const { endDate, startDate } = searchInput.rangeDate;
        const PERIOD = (0, moment_1.default)(endDate).diff((0, moment_1.default)(startDate), 'day') + 1;
        const chartStats = [];
        for (let i = 0; i < PERIOD; i++) {
            const employeeMap = new Map();
            employees.forEach((employee) => {
                employeeMap.set(employee.id, {
                    income: 0,
                    expense: 0,
                    bonus: 0,
                    profit: 0,
                    employee: {
                        id: employee.id,
                        user: employee.user
                    }
                });
            });
            if (employees.length > 0) {
                await this._loadAllData({
                    ...searchInput,
                    rangeDate: {
                        startDate: (0, moment_1.default)(startDate).add(i, 'day').toDate(),
                        endDate: (0, moment_1.default)(startDate)
                            .add(i + 1, 'day')
                            .toDate()
                    }
                }, employeeMap, organizationId);
            }
            const employeeStats = [...employeeMap.values()];
            chartStats.push({
                dates: (0, moment_1.default)(startDate).add(i, 'day').format('LL'),
                statistics: employeeStats.reduce(this._aggregateEmployeeStats, {
                    income: 0,
                    expense: 0,
                    bonus: 0,
                    profit: 0
                })
            });
        }
        return chartStats;
    }
    async _loadAllData(searchInput, employeeMap, organizationId) {
        // 1.Load Income and Direct Bonus in employeeMap
        await this._loadIncomeAndDirectBonus(searchInput, employeeMap, organizationId);
        // 2. Populate Expenses(One time, Recurring, and split expenses) in employeeMap
        await this._loadEmployeeExpenses(searchInput, employeeMap, organizationId);
        /**
         * Load Recurring/Split Expenses for organization/employees
         */
        await this._loadEmployeeRecurringExpenses(searchInput, employeeMap, organizationId);
        await this._loadOrganizationSplitExpenses(searchInput, employeeMap, organizationId);
        await this._loadOrganizationRecurringSplitExpenses(searchInput, employeeMap, organizationId);
        // 3. Populate Profit in employeeMap
        this._calculateProfit(employeeMap);
        // 4. Populate Bonus in employeeMap
        await this._loadEmployeeBonus(employeeMap);
    }
    async _loadIncomeAndDirectBonus(searchInput, employeeMap, organizationId) {
        // Fetch employees' incomes for past N months from given date
        const { items: incomes } = await this.employeeStatisticsService.employeeIncomeInNMonths([...employeeMap.keys()], searchInput.rangeDate, organizationId);
        incomes.forEach((income) => {
            const stat = employeeMap.get(income.employeeId);
            const amount = Number(income.amount);
            stat.income = Number((stat.income + amount).toFixed(2));
            stat.bonus = income.isBonus
                ? Number((stat.bonus + amount).toFixed(2))
                : stat.bonus;
        });
    }
    async _loadEmployeeExpenses(searchInput, employeeMap, organizationId) {
        // Fetch employees' expenses for past N months from given date
        const { items: expenses } = await this.employeeStatisticsService.employeeExpenseInNMonths([...employeeMap.keys()], searchInput.rangeDate, organizationId);
        expenses.forEach((expense) => {
            const stat = employeeMap.get(expense.employeeId);
            const amount = Number(expense.amount);
            stat.expense = Number((amount + stat.expense).toFixed(2));
        });
    }
    async _loadEmployeeRecurringExpenses(searchInput, employeeMap, organizationId) {
        // Fetch employees' recurring expenses for past N months from given date
        const { items: employeeRecurringExpenses } = await this.employeeStatisticsService.employeeRecurringExpenses([...employeeMap.keys()], searchInput.rangeDate, organizationId);
        const { startDate, endDate } = searchInput.rangeDate;
        /**
         * Add recurring expense from the
         * expense start date
         * OR
         * past N months to each month's expense, whichever is lesser
         * Stop adding recurring expenses at the month where it was stopped
         * OR
         * till the input date
         */
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
                const amount = Number(expense.value);
                const stat = employeeMap.get(expense.employeeId);
                stat.expense = Number((amount + stat.expense).toFixed(2));
            }
        });
    }
    async _loadOrganizationSplitExpenses(searchInput, employeeMap, organizationId) {
        const employeeIds = [...employeeMap.keys()];
        // Fetch split expenses and the number of employees the expense need to be split among for each month
        // TODO: Handle case when searchInput.months > 1
        const expenses = await this.employeeStatisticsService.employeeSplitExpenseInNMonths(employeeIds[0], // split expenses are fetched at organization level, 1st Employee
        searchInput.rangeDate, organizationId);
        //Since we are only calculating for one month, we only expect one value here.
        const monthSplitExpense = expenses
            .values()
            .next().value;
        if (monthSplitExpense) {
            // Add split expense share to each employee's expenses
            employeeMap.forEach((emp) => {
                emp.expense = Number((emp.expense + monthSplitExpense.splitExpense).toFixed(2));
            });
        }
    }
    async _loadOrganizationRecurringSplitExpenses(searchInput, employeeMap, organizationId) {
        const employeeIds = [...employeeMap.keys()];
        // Fetch split expenses and the number of employees the expense need to be split among
        const organizationRecurringSplitExpenses = await this.employeeStatisticsService.organizationRecurringSplitExpenses(employeeIds[0], searchInput.rangeDate, organizationId);
        //Since we are only calculating for one month, we only expect one value here.
        const monthSplitExpense = organizationRecurringSplitExpenses.values().next().value;
        if (monthSplitExpense) {
            employeeMap.forEach((emp) => (emp.expense = Number((emp.expense + monthSplitExpense.splitExpense).toFixed(2))));
        }
    }
    _calculateProfit(employeeMap) {
        employeeMap.forEach((emp) => {
            emp.profit = Number((emp.income - emp.expense).toFixed(2));
        });
    }
    async _loadEmployeeBonus(employeeMap) {
        const employeeIds = [...employeeMap.keys()];
        const { organization: { bonusType, bonusPercentage } } = await this.employeeService.findOneByIdString(employeeIds[0], {
            relations: ['organization']
        });
        employeeMap.forEach((emp) => {
            const bonus = this.employeeStatisticsService.calculateEmployeeBonus(bonusType, bonusPercentage, emp.income, emp.profit);
            emp.bonus = Number((emp.bonus + bonus).toFixed(2));
        });
    }
    _aggregateEmployeeStats(accumulator, value) {
        accumulator.income = Number((accumulator.income + value.income).toFixed(2));
        accumulator.expense = Number((accumulator.expense + value.expense).toFixed(2));
        accumulator.profit = Number((accumulator.profit + value.profit).toFixed(2));
        accumulator.bonus = Number((accumulator.bonus + value.bonus).toFixed(2));
        return accumulator;
    }
};
exports.AggregateOrganizationQueryHandler = AggregateOrganizationQueryHandler = __decorate([
    (0, cqrs_1.QueryHandler)(aggregate_employee_statistic_query_1.AggregatedEmployeeStatisticQuery),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService,
        employee_statistics_service_1.EmployeeStatisticsService])
], AggregateOrganizationQueryHandler);
//# sourceMappingURL=aggregate-employee-statistic.handler.js.map
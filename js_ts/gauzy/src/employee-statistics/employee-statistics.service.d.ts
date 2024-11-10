import { IEmployeeStatistics, IEmployeeStatisticsFindInput, IMonthAggregatedSplitExpense, IDateRangePicker } from '../../plugins/contracts/dist/index';
import { EmployeeService } from '../employee/employee.service';
import { ExpenseService } from '../expense/expense.service';
import { IncomeService } from '../income/income.service';
import { EmployeeRecurringExpenseService } from '../employee-recurring-expense/employee-recurring-expense.service';
import { OrganizationRecurringExpenseService } from '../organization-recurring-expense/organization-recurring-expense.service';
export declare class EmployeeStatisticsService {
    private readonly incomeService;
    private readonly expenseService;
    private readonly employeeRecurringExpenseService;
    private readonly employeeService;
    private readonly organizationRecurringExpenseService;
    private _monthNames;
    constructor(incomeService: IncomeService, expenseService: ExpenseService, employeeRecurringExpenseService: EmployeeRecurringExpenseService, employeeService: EmployeeService, organizationRecurringExpenseService: OrganizationRecurringExpenseService);
    getStatisticsByEmployeeId(employeeId: string, findInput?: IEmployeeStatisticsFindInput): Promise<IEmployeeStatistics>;
    private _getLast12months;
    private _formatDate;
    /**
     * Return bonus value based on the bonus type and percentage
     * For revenue based bonus, bonus is calculated based on income
     * For profit based bonus, bonus is calculated based on profit
     */
    calculateEmployeeBonus: (bonusType: string, bonusPercentage: number, income: number, profit: number) => number;
    /**
     * Gets all income records of one or more employees(using employeeId)
     * in last N months(lastNMonths),
     * till the specified Date(searchMonth)
     * lastNMonths = 1, for last 1 month and 12 for an year
     */
    employeeIncomeInNMonths: (employeeIds: string[], { startDate, endDate }: IDateRangePicker, organizationId: string) => Promise<import("../../plugins/contracts/dist/core.model").IPagination<import("..").Income>>;
    /**
     * Gets all expense records of one or more employees(using employeeId)
     * in last N months(lastNMonths),
     * till the specified Date(searchMonth)
     * lastNMonths = 1, for last 1 month and 12 for an year
     */
    employeeExpenseInNMonths: (employeeIds: string[], { startDate, endDate }: IDateRangePicker, organizationId: string) => Promise<import("../../plugins/contracts/dist/core.model").IPagination<import("..").Expense>>;
    /**
     * Fetch all recurring expenses of one or more employees using employeeId
     */
    employeeRecurringExpenses: (employeeIds: string[], { startDate, endDate }: IDateRangePicker, organizationId: string) => Promise<import("../../plugins/contracts/dist/core.model").IPagination<import("..").EmployeeRecurringExpense>>;
    /**
     * Gets all expense records of a employee's organization(employeeId)
     * that were marked to be split among its employees,
     * in last N months(lastNMonths),till the specified Date(searchMonth)
     * lastNMonths = 1, for last 1 month and 12 for an year
     *
     * @returns {Promise<Map<string, IMonthAggregatedSplitExpense>>} A map with
     * the key as 'month-year' for every month in the range & for which at least
     * one expense is available
     */
    employeeSplitExpenseInNMonths: (employeeId: string, { startDate, endDate }: IDateRangePicker, organizationId: string) => Promise<Map<string, IMonthAggregatedSplitExpense>>;
    /**
     * Fetch all recurring split expenses of the employee's Organization
     */
    organizationRecurringSplitExpenses: (employeeId: string, { startDate, endDate }: IDateRangePicker, organizationId: string) => Promise<Map<string, IMonthAggregatedSplitExpense>>;
}

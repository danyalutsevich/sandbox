import { IMonthAggregatedEmployeeStatistics } from '../../../../plugins/contracts';
import { IQueryHandler } from '@nestjs/cqrs';
import { EmployeeService } from '../../../employee/employee.service';
import { EmployeeStatisticsService } from '../../employee-statistics.service';
import { MonthAggregatedEmployeeStatisticsQuery } from '../month-aggregated-employee-statistics.query';
/**
 * Finds income, expense, profit and bonus
 * for past N months of an employee a given value date.
 */
export declare class MonthAggregatedEmployeeStatisticsQueryHandler implements IQueryHandler<MonthAggregatedEmployeeStatisticsQuery> {
    private readonly employeeStatisticsService;
    private readonly employeeService;
    constructor(employeeStatisticsService: EmployeeStatisticsService, employeeService: EmployeeService);
    execute(command: MonthAggregatedEmployeeStatisticsQuery): Promise<IMonthAggregatedEmployeeStatistics[]>;
    /**
     *
     * @param input
     * @param statisticsMap
     * Fetches employee's incomes for past N months from given date
     * Updates income and bonus statistics values(in case direct bonus income) in map if key pre-exists
     * Adds a new map entry if the key(month-year) does not already exist
     */
    private _loadEmployeeIncomeAndDirectBonus;
    /**
     *
     * @param input
     * @param statisticsMap
     * Fetches employee's expenses for past N months from given date
     * Updates expense statistics values in map if key pre-exists
     * Adds a new map entry if the key(month-year) does not already exist
     */
    private _loadEmployeeExpenses;
    /**
     *
     * @param input
     * @param statisticsMap
     * Fetches employee's recurring expenses
     * Updates expense statistics values in map if key pre-exists
     * Adds a new map entry if the key(month-year) does not already exist
     */
    private _loadEmployeeRecurringExpenses;
    /**
     *
     * @param input
     * @param statisticsMap
     * Fetches employee's organization expenses that were marked to be split among
     * its employees for past N months from given date
     * Updates expense statistics values in map if key pre-exists
     * Adds a new map entry if the key(month-year) does not already exist
     */
    private _loadOrganizationSplitExpenses;
    /**
     *
     * @param input
     * @param statisticsMap
     * Fetches employee's organization recurring expenses that were marked to be split among
     * its employees for past N months from given date
     * Updates expense statistics values in map if key pre-exists
     * Adds a new map entry if the key(month-year) does not already exist

     */
    private _loadOrganizationRecurringSplitExpenses;
    /**
     *
     * @param statisticsMap
     * Profit = Income - Expense
     * For every stat entry in the map, update profit value
     */
    private _calculateProfit;
    /**
     *
     * @param input
     * @param statisticsMap
     * Fetch employee's organization bonus type and percentage
     * For every stat entry in the map, update bonus value
     */
    private _loadEmployeeBonus;
}

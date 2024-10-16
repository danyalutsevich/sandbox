import { IAggregatedEmployeeStatistic } from '../../../../plugins/contracts/dist/index';
import { IQueryHandler } from '@nestjs/cqrs';
import { EmployeeService } from '../../../employee/employee.service';
import { AggregatedEmployeeStatisticQuery } from '../aggregate-employee-statistic.query';
import { EmployeeStatisticsService } from './../../employee-statistics.service';
/**
 * Finds income, expense, profit and bonus for all employees for the given month.
 * If month is not specified, finds from the start of time till now.
 */
export declare class AggregateOrganizationQueryHandler implements IQueryHandler<AggregatedEmployeeStatisticQuery> {
    private employeeService;
    private employeeStatisticsService;
    constructor(employeeService: EmployeeService, employeeStatisticsService: EmployeeStatisticsService);
    execute(command: AggregatedEmployeeStatisticQuery): Promise<IAggregatedEmployeeStatistic>;
    private _loadChartData;
    private _loadAllData;
    private _loadIncomeAndDirectBonus;
    private _loadEmployeeExpenses;
    private _loadEmployeeRecurringExpenses;
    private _loadOrganizationSplitExpenses;
    private _loadOrganizationRecurringSplitExpenses;
    private _calculateProfit;
    private _loadEmployeeBonus;
    private _aggregateEmployeeStats;
}

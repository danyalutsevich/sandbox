import { IQueryHandler } from '@nestjs/cqrs';
import { EmployeeStatisticsService } from '../../employee-statistics.service';
import { IEmployeeStatisticsHistory } from '../../../../plugins/contracts/dist/index';
import { EmployeeStatisticsHistoryQuery } from '../employee-statistics-history.query';
/**
 * Finds income, expense history
 * for past N months of an employee a given value date.
 */
export declare class EmployeeStatisticsHistoryQueryHandler implements IQueryHandler<EmployeeStatisticsHistoryQuery> {
    private employeeStatisticsService;
    constructor(employeeStatisticsService: EmployeeStatisticsService);
    execute(command: EmployeeStatisticsHistoryQuery): Promise<IEmployeeStatisticsHistory[]>;
    private _incomeHistory;
    private _expenseHistory;
    private _loadEmployeeExpenses;
    private _loadEmployeeRecurringExpenses;
    private _loadOrganizationSplitExpenses;
    private _loadOrganizationRecurringSplitExpenses;
}

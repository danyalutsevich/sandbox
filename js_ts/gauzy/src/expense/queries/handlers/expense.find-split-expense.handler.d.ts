import { IPagination, ISplitExpenseOutput } from '../../../../plugins/contracts/dist/index';
import { IQueryHandler } from '@nestjs/cqrs';
import { EmployeeService } from '../../../employee/employee.service';
import { ExpenseService } from '../../expense.service';
import { FindSplitExpenseQuery } from '../expense.find-split-expense.query';
/**
 * Finds the split expense for a given organization.
 *
 * 1. Find all expenses for organization which have splitExpense = true & all for the employee
 * 2. Find all employees of the organization (TODO: No. of employees CURRENTLY in the organization?)
 * 3. Divide the value of the expense found in 1 to the no. of employees found in 2 to 'split' the expense equally for all employees.
 */
export declare class FindSplitExpenseHandler implements IQueryHandler<FindSplitExpenseQuery> {
    private readonly expenseService;
    private readonly employeeService;
    constructor(expenseService: ExpenseService, employeeService: EmployeeService);
    execute(query: FindSplitExpenseQuery): Promise<IPagination<ISplitExpenseOutput>>;
}

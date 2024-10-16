import { IOrganizationRecurringExpenseForEmployeeOutput, IPagination } from '../../../../plugins/contracts/dist/index';
import { IQueryHandler } from '@nestjs/cqrs';
import { EmployeeService } from '../../../employee/employee.service';
import { OrganizationService } from '../../../organization/organization.service';
import { OrganizationRecurringExpenseService } from '../../organization-recurring-expense.service';
import { OrganizationRecurringExpenseFindSplitExpenseQuery } from '../organization-recurring-expense.find-split-expense.query';
/**
 * Finds the split recurring expense for a given organization.
 *
 * 1. Find all recurring expenses for the organization which have splitExpense = true
 * 2. Find all employees of the organization (TODO: No. of employees CURRENTLY in the organization?)
 * 3. Divide the value of the expense found in 1 to the no. of employees found in 2 to 'split' the expense equally for all employees.
 */
export declare class OrganizationRecurringExpenseFindSplitExpenseHandler implements IQueryHandler<OrganizationRecurringExpenseFindSplitExpenseQuery> {
    private readonly organizationRecurringExpenseService;
    private readonly organizationService;
    private readonly employeeService;
    constructor(organizationRecurringExpenseService: OrganizationRecurringExpenseService, organizationService: OrganizationService, employeeService: EmployeeService);
    execute(query: OrganizationRecurringExpenseFindSplitExpenseQuery): Promise<IPagination<IOrganizationRecurringExpenseForEmployeeOutput>>;
}

import { IEmployeeRecurringExpense } from '../../../../plugins/contracts/dist/index';
import { ICommandHandler } from '@nestjs/cqrs';
import { EmployeeRecurringExpenseService } from '../../employee-recurring-expense.service';
import { EmployeeRecurringExpenseCreateCommand } from '../employee-recurring-expense.create.command';
/**
 * Creates a recurring expense for an employee.
 * The parentRecurringExpenseId is it's own id since this is a new expense.
 */
export declare class EmployeeRecurringExpenseCreateHandler implements ICommandHandler<EmployeeRecurringExpenseCreateCommand> {
    private readonly employeeRecurringExpenseService;
    constructor(employeeRecurringExpenseService: EmployeeRecurringExpenseService);
    execute(command: EmployeeRecurringExpenseCreateCommand): Promise<IEmployeeRecurringExpense>;
}

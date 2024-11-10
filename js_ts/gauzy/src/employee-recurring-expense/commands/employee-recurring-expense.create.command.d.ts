import { IEmployeeRecurringExpense } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class EmployeeRecurringExpenseCreateCommand implements ICommand {
    readonly input: IEmployeeRecurringExpense;
    static readonly type = "[Employee Recurring Expense] Create";
    constructor(input: IEmployeeRecurringExpense);
}

import { IEmployeeRecurringExpense, IRecurringExpenseEditInput } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class EmployeeRecurringExpenseEditCommand implements ICommand {
    readonly id: IEmployeeRecurringExpense['id'];
    readonly input: IRecurringExpenseEditInput;
    static readonly type = "[EmployeeRecurringExpense] Edit";
    constructor(id: IEmployeeRecurringExpense['id'], input: IRecurringExpenseEditInput);
}

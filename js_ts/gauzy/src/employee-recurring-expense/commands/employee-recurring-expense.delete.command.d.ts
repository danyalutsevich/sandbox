import { IRecurringExpenseDeleteInput } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class EmployeeRecurringExpenseDeleteCommand implements ICommand {
    readonly id: string;
    readonly deleteInput: IRecurringExpenseDeleteInput;
    static readonly type = "[EmployeeRecurringExpense] Delete";
    constructor(id: string, deleteInput: IRecurringExpenseDeleteInput);
}

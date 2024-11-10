import { IRecurringExpenseDeleteInput } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class OrganizationRecurringExpenseDeleteCommand implements ICommand {
    readonly id: string;
    readonly deleteInput: IRecurringExpenseDeleteInput;
    static readonly type = "[OrganizationRecurringExpense] Delete";
    constructor(id: string, deleteInput: IRecurringExpenseDeleteInput);
}

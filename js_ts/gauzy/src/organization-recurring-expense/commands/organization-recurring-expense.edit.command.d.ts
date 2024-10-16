import { IRecurringExpenseEditInput as IExpenseEditInput } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class OrganizationRecurringExpenseEditCommand implements ICommand {
    readonly id: string;
    readonly input: IExpenseEditInput;
    static readonly type = "[OrganizationRecurringExpense] Edit";
    constructor(id: string, input: IExpenseEditInput);
}

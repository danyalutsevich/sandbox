import { ICommand } from '@nestjs/cqrs';
import { IExpenseCreateInput } from '../../../plugins/contracts';
export declare class ExpenseCreateCommand implements ICommand {
    readonly input: IExpenseCreateInput;
    static readonly type = "[Expense] Create";
    constructor(input: IExpenseCreateInput);
}

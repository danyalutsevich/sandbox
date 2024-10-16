import { ICommand } from '@nestjs/cqrs';
import { IExpense } from '../../../plugins/contracts';
export declare class ExpenseUpdateCommand implements ICommand {
    readonly id: string;
    readonly entity: IExpense;
    static readonly type = "[Expense] Update";
    constructor(id: string, entity: IExpense);
}

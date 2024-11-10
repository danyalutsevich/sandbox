import { IExpenseCategory } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class ExpenseCategoryFirstOrCreateCommand implements ICommand {
    readonly input: IExpenseCategory;
    static readonly type = "[ExpenseCategory] First Or Create";
    constructor(input: IExpenseCategory);
}

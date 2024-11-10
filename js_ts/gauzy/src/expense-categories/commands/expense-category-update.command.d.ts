import { IExpenseCategory } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class ExpenseCategoryUpdateCommand implements ICommand {
    readonly id: IExpenseCategory['id'];
    readonly input: IExpenseCategory;
    static readonly type = "[ExpenseCategory] Update";
    constructor(id: IExpenseCategory['id'], input: IExpenseCategory);
}

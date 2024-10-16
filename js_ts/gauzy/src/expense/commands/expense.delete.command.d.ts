import { ICommand } from '@nestjs/cqrs';
export declare class ExpenseDeleteCommand implements ICommand {
    readonly employeeId: string;
    readonly expenseId: string;
    static readonly type = "[Expense] Delete";
    constructor(employeeId: string, expenseId: string);
}

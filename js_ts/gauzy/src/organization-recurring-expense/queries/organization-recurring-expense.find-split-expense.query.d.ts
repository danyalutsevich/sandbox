import { IQuery } from '@nestjs/cqrs';
import { IOrganizationRecurringExpenseFindInput } from '../../../plugins/contracts';
export declare class OrganizationRecurringExpenseFindSplitExpenseQuery implements IQuery {
    readonly orgId: string;
    readonly findInput: IOrganizationRecurringExpenseFindInput;
    static readonly type = "[OrganizationRecurringExpense] Find Split Expense";
    constructor(orgId: string, findInput: IOrganizationRecurringExpenseFindInput);
}

import { IOrganizationRecurringExpense } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class OrganizationRecurringExpenseCreateCommand implements ICommand {
    readonly input: IOrganizationRecurringExpense;
    static readonly type = "[OrganizationRecurringExpense] Create";
    constructor(input: IOrganizationRecurringExpense);
}

import { IFindStartDateUpdateTypeInput } from '../../../plugins/contracts';
import { IQuery } from '@nestjs/cqrs';
export declare class OrganizationRecurringExpenseStartDateUpdateTypeQuery implements IQuery {
    readonly input: IFindStartDateUpdateTypeInput;
    static readonly type = "[OrganizationRecurringExpense] Start Date Update Type";
    constructor(input: IFindStartDateUpdateTypeInput);
}

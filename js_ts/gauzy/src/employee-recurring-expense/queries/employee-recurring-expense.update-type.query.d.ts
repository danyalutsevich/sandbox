import { IFindStartDateUpdateTypeInput } from '../../../plugins/contracts';
import { IQuery } from '@nestjs/cqrs';
export declare class EmployeeRecurringExpenseStartDateUpdateTypeQuery implements IQuery {
    readonly input: IFindStartDateUpdateTypeInput;
    static readonly type = "[EmployeeRecurringExpense] Start Date Update Type";
    constructor(input: IFindStartDateUpdateTypeInput);
}

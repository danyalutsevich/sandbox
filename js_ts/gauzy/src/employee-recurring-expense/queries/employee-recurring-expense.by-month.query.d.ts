import { IEmployeeRecurringExpenseByMonthFindInput } from '../../../plugins/contracts';
import { IQuery } from '@nestjs/cqrs';
export declare class EmployeeRecurringExpenseByMonthQuery implements IQuery {
    readonly input: IEmployeeRecurringExpenseByMonthFindInput;
    readonly relations: string[];
    static readonly type = "[EmployeeRecurringExpense] By Month";
    constructor(input: IEmployeeRecurringExpenseByMonthFindInput, relations?: string[]);
}

import { IPagination, IRecurringExpenseByMonthFindInput, IRecurringExpenseModel } from '../../../plugins/contracts';
import { CrudService } from './../../core/crud';
/**
 * Finds income, expense, profit and bonus for all organizations for the given month.
 *
 * (start date) < (input date) < (end date, null for end date is treated as infinity)
 *
 * If year is different, only company year.
 * If year is same, compare month
 */
export declare abstract class FindRecurringExpenseByMonthHandler<T extends IRecurringExpenseModel> {
    private readonly crudService;
    constructor(crudService: CrudService<T>);
    executeCommand(input: IRecurringExpenseByMonthFindInput | any, relations?: string[]): Promise<IPagination<T>>;
}

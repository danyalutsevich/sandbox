import { IRecurringExpenseEditInput, IRecurringExpenseModel } from '../../../plugins/contracts';
import { CrudService } from '../../core';
/**
 * Edits a recurring expense.
 * To edit a recurring expense there can be different cases depending on the new start date.
 * For description of difference in each StartDateUpdateTypeEnum please refer to FindRecurringExpenseStartDateUpdateTypeHandler
 */
export declare abstract class RecurringExpenseEditHandler<T extends IRecurringExpenseModel> {
    private readonly crudService;
    constructor(crudService: CrudService<T>);
    executeCommand(id: string, input: IRecurringExpenseEditInput): Promise<any>;
    /**
     * Update the original expense with the input values.
     * This is to be used when there is no other change required to update the expense.
     */
    private updateExpenseStartDateAndValue;
    /**
     * This increases the date of the recurring expense when it is safe to do so
     * i.e. it is not conflicting with any other expense with the same parentExpenseId
     *
     * To do this we
     * 1. Change the end date of the original expense so that old value is not modified for previous expense.
     * 2. Create a new expense to have new values for all future dates.
     */
    private increaseSafe;
    /**
     * Decrease the date of the recurring expense while modifying the date of the conflicting expense
     * 1. Find conflicting expense
     * 2. Update end date of conflicting expense to one month after the input month
     * 3. Remove any expense if is in between
     * 4. This resolves the conflict, now do a simple non conflicting update.
     */
    private reduceConflict;
    /**
     * Decrease only the end date to the end of previous month without modifying any value
     */
    private reduceEndDateToPreviousMonth;
    /**
     * Find all expenses (except the recurringExpenseId) between a given start and end months of the same parent recurring expense id.
     */
    findAllExpensesInBetween(recurringExpenseId: string, parentRecurringExpenseId: string, updatedStartYear: number, updatedStartMonth: number, currentStartYear: number, currentStartMonth: number): Promise<import("../../../plugins/contracts").IPagination<T>>;
    findConflictingExpense(recurringExpenseId: string, parentRecurringExpenseId: string, year: number, month: number): Promise<T>;
}

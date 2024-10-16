import { IOrganizationRecurringExpense, IRecurringExpenseDeleteInput, IRecurringExpenseModel } from '../../../plugins/contracts';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CrudService } from '../../core';
/**
 * Deletes a OrganizationRecurringExpense based on command.deleteInput.deletionType:
 *
 * 1. ALL: Delete all entries for an expense (By actually deleting it from the db)
 * 2. FUTURE : Delete only current and future events (By reducing the end date)
 * 3. CURRENT : Delete only one month (By splitting the expense into two)
 *
 * TODO: Fix typescript, remove usage of :any
 */
export declare abstract class RecurringExpenseDeleteHandler<T extends IRecurringExpenseModel> {
    private readonly crudService;
    constructor(crudService: CrudService<T>);
    executeCommand(id: string, deleteInput: IRecurringExpenseDeleteInput): Promise<IOrganizationRecurringExpense | UpdateResult | DeleteResult>;
    /**
     * This removes the given month in deleteInput from the expense.
     * 1. Find the original expense.
     * 2. Check if there is only one month in the original month (start date = end date = the one which needs to be deleted)
     * 2.a If true then delete the entry completely.
     * 2.b If false proceed to 3
     * 3. Check if this is the first month (start date = the one which needs to be deleted)
     * 3.a If true then delete entry but create for next months
     * 3.b If false then proceed to 4
     * 4. Update the end month of the original expense to one less than the month to be deleted
     * 5. Create a new record with start month as one more than the month to be deleted
     */
    private deleteOneMonthOnly;
    /**
     * Updates the end date to one month before deleteInput.month
     */
    private updateEndDateToLastMonth;
    /**
     * Creates a copy of the originalExpense but with start date are one month more than deleteInput
     * By default, start date is the first day of the month & end date is the last date of the month
     *
     * @param deleteInput The delete input
     * @param originalExpense The original (non modified) expense
     */
    private createExpenseFromNextMonth;
}

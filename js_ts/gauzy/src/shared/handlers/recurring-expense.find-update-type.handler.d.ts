import { IFindStartDateUpdateTypeInput, IStartUpdateTypeInfo, IRecurringExpenseModel } from '../../../plugins/contracts';
import { CrudService } from '../../core';
/**
 * Finds the start date update type.
 *
 * When updating the start date, if
 * NO_CHANGE: When there is no change in the date.
 * WITHIN_MONTH: When the change is within a particular month.
 * INCREASE_SAFE_WITHIN_LIMIT: When the change is 'safe*' and the new start date is BEFORE the end date
 * INCREASE_SAFE_OUTSIDE_LIMIT: When the change is 'safe*' and the new start date is AFTER the end date
 * INCREASE_CONFLICT: When there are one or more conflicting expenses between the original start date and new start date
 * REDUCE_SAFE: When the new start date is before the old start date and it is 'safe*' to update the date
 * REDUCE_CONFLICT: When the new start date is before the old start date and there is some expense already with the same parentRecurringExpenseId for the date
 *
 * *safe: An expense update is 'safe' when there is no other expense with the same parentRecurringExpenseId for the new start date.
 */
export declare abstract class FindRecurringExpenseStartDateUpdateTypeHandler<T extends IRecurringExpenseModel> {
    private readonly crudService;
    constructor(crudService: CrudService<T>);
    executeQuery(input: IFindStartDateUpdateTypeInput): Promise<IStartUpdateTypeInfo>;
    /**
     * Returns whether the increase is safe or has conflicts.
     * 1. If new start date is more than original end date then it is outside limit
     * 2. Find all expenses between original start date and new start date, if any expense found then conflict
     */
    private getIncreaseType;
    /**
     * Returns whether reducing the start date is safe or has conflicts.
     * Find all expenses between new start date and original start date, if any expense found then conflict
     */
    private getReduceType;
    /**
     * Find all expenses (except the recurringExpenseId) between a given from and to date of the same parent recurring expense id.
     */
    private findAllExpensesInBetween;
}

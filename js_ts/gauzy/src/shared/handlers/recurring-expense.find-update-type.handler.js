"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindRecurringExpenseStartDateUpdateTypeHandler = void 0;
const contracts_1 = require("../../../plugins/contracts");
const typeorm_1 = require("typeorm");
const core_1 = require("../../core");
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
class FindRecurringExpenseStartDateUpdateTypeHandler {
    crudService;
    constructor(crudService) {
        this.crudService = crudService;
    }
    async executeQuery(input) {
        const { newStartDate, recurringExpenseId } = input;
        const originalExpense = await this.crudService.findOneByIdString(recurringExpenseId);
        const oldStartDateObject = originalExpense.startDate;
        const newStartDateObject = new Date(newStartDate);
        if (oldStartDateObject.getTime() === newStartDateObject.getTime()) {
            return { value: contracts_1.StartDateUpdateTypeEnum.NO_CHANGE, conflicts: [] };
        }
        else if (newStartDateObject.getMonth() === oldStartDateObject.getMonth() &&
            newStartDateObject.getFullYear() ===
                oldStartDateObject.getFullYear()) {
            return {
                value: contracts_1.StartDateUpdateTypeEnum.WITHIN_MONTH,
                conflicts: []
            };
        }
        else if (newStartDateObject.getTime() > oldStartDateObject.getTime()) {
            return this.getIncreaseType(originalExpense, newStartDateObject);
        }
        else if (newStartDateObject.getTime() < oldStartDateObject.getTime()) {
            return this.getReduceType(originalExpense, newStartDate);
        }
    }
    /**
     * Returns whether the increase is safe or has conflicts.
     * 1. If new start date is more than original end date then it is outside limit
     * 2. Find all expenses between original start date and new start date, if any expense found then conflict
     */
    async getIncreaseType(originalExpense, newStartDateObject) {
        const safeUpdateType = originalExpense.endDate &&
            newStartDateObject.getTime() > originalExpense.endDate.getTime()
            ? contracts_1.StartDateUpdateTypeEnum.INCREASE_SAFE_OUTSIDE_LIMIT
            : contracts_1.StartDateUpdateTypeEnum.INCREASE_SAFE_WITHIN_LIMIT;
        const { items: foundRecurringExpenses, total } = await this.findAllExpensesInBetween(originalExpense.id, originalExpense.parentRecurringExpenseId, new Date(originalExpense.startYear, originalExpense.startMonth, 1), new Date(newStartDateObject.getFullYear(), newStartDateObject.getMonth(), (0, core_1.getLastDayOfMonth)(newStartDateObject.getFullYear(), newStartDateObject.getMonth())));
        return {
            value: total === 0
                ? safeUpdateType
                : contracts_1.StartDateUpdateTypeEnum.INCREASE_CONFLICT,
            conflicts: foundRecurringExpenses
        };
    }
    /**
     * Returns whether reducing the start date is safe or has conflicts.
     * Find all expenses between new start date and original start date, if any expense found then conflict
     */
    async getReduceType(originalExpense, newStartDate) {
        const currentStartDate = new Date(originalExpense.startYear, originalExpense.startMonth, (0, core_1.getLastDayOfMonth)(originalExpense.startYear, originalExpense.startMonth));
        const { items: foundRecurringExpenses, total } = await this.findAllExpensesInBetween(originalExpense.id, originalExpense.parentRecurringExpenseId, newStartDate, currentStartDate);
        return {
            value: total === 0
                ? contracts_1.StartDateUpdateTypeEnum.REDUCE_SAFE
                : contracts_1.StartDateUpdateTypeEnum.REDUCE_CONFLICT,
            conflicts: foundRecurringExpenses
        };
    }
    /**
     * Find all expenses (except the recurringExpenseId) between a given from and to date of the same parent recurring expense id.
     */
    async findAllExpensesInBetween(recurringExpenseId, parentRecurringExpenseId, fromStartDate, toStartDate) {
        return await this.crudService.findAll({
            where: [
                {
                    id: (0, typeorm_1.Not)(recurringExpenseId),
                    parentRecurringExpenseId: parentRecurringExpenseId,
                    startDate: (0, typeorm_1.Between)(fromStartDate, toStartDate)
                },
                {
                    id: (0, typeorm_1.Not)(recurringExpenseId),
                    parentRecurringExpenseId: parentRecurringExpenseId,
                    endDate: (0, typeorm_1.Between)(fromStartDate, toStartDate)
                }
            ]
        });
    }
}
exports.FindRecurringExpenseStartDateUpdateTypeHandler = FindRecurringExpenseStartDateUpdateTypeHandler;
//# sourceMappingURL=recurring-expense.find-update-type.handler.js.map
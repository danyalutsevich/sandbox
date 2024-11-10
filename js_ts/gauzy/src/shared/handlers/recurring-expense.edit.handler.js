"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurringExpenseEditHandler = void 0;
const contracts_1 = require("../../../plugins/contracts");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const core_1 = require("../../core");
/**
 * Edits a recurring expense.
 * To edit a recurring expense there can be different cases depending on the new start date.
 * For description of difference in each StartDateUpdateTypeEnum please refer to FindRecurringExpenseStartDateUpdateTypeHandler
 */
class RecurringExpenseEditHandler {
    crudService;
    constructor(crudService) {
        this.crudService = crudService;
    }
    async executeCommand(id, input) {
        const originalExpense = await this.crudService.findOneByIdString(id);
        const { startDateUpdateType } = input;
        switch (startDateUpdateType) {
            case contracts_1.StartDateUpdateTypeEnum.NO_CHANGE:
            case contracts_1.StartDateUpdateTypeEnum.WITHIN_MONTH:
            case contracts_1.StartDateUpdateTypeEnum.REDUCE_SAFE:
                return this.updateExpenseStartDateAndValue(id, input);
            case contracts_1.StartDateUpdateTypeEnum.INCREASE_SAFE_OUTSIDE_LIMIT:
            case contracts_1.StartDateUpdateTypeEnum.INCREASE_SAFE_WITHIN_LIMIT:
                return this.increaseSafe(id, input, originalExpense);
            case contracts_1.StartDateUpdateTypeEnum.REDUCE_CONFLICT:
                return this.reduceConflict(id, input, originalExpense);
            case contracts_1.StartDateUpdateTypeEnum.INCREASE_CONFLICT:
                //TODO: Handle this case too
                throw new common_1.BadRequestException('Cannot increase start date with conflicts');
            default:
                throw new common_1.BadRequestException('Start Date Update Type Not Defined');
        }
    }
    /**
     * Update the original expense with the input values.
     * This is to be used when there is no other change required to update the expense.
     */
    updateExpenseStartDateAndValue = async (id, input) => {
        //TODO: Fix typescript
        const updateObject = {
            startDay: input.startDay,
            startMonth: input.startMonth,
            startYear: input.startYear,
            startDate: new Date(input.startYear, input.startMonth, input.startDay),
            value: input.value,
            categoryName: input.categoryName,
        };
        return await this.crudService.update(id, updateObject);
    };
    /**
     * This increases the date of the recurring expense when it is safe to do so
     * i.e. it is not conflicting with any other expense with the same parentExpenseId
     *
     * To do this we
     * 1. Change the end date of the original expense so that old value is not modified for previous expense.
     * 2. Create a new expense to have new values for all future dates.
     */
    increaseSafe = async (id, input, originalExpense) => {
        const originalEndDate = new Date(originalExpense.endYear, originalExpense.endMonth, originalExpense.endDay);
        const newStartDate = new Date(input.startYear, input.startMonth, input.startDay);
        //1. Change the end date of the original expense so that old value is not modified for previous expense.
        const endMonth = input.startMonth > 0 ? input.startMonth - 1 : 11;
        const endYear = input.startMonth > 0 ? input.startYear : input.startYear - 1;
        const endDay = (0, core_1.getLastDayOfMonth)(endYear, endMonth);
        //TODO: Fix typescript
        const updateObject = {
            endDay,
            endMonth,
            endYear,
            endDate: new Date(endYear, endMonth, endDay)
        };
        await this.crudService.update(id, updateObject);
        const createObject = {
            startDay: input.startDay,
            startMonth: input.startMonth,
            startYear: input.startYear,
            startDate: new Date(input.startYear, input.startMonth, input.startDay),
            endDay: originalEndDate > newStartDate ? originalExpense.endDay : null,
            endMonth: originalEndDate > newStartDate
                ? originalExpense.endMonth
                : null,
            endYear: originalEndDate > newStartDate ? originalExpense.endYear : null,
            endDate: originalEndDate > newStartDate ? originalExpense.endDate : null,
            value: input.value,
            categoryName: originalExpense.categoryName,
            currency: originalExpense.currency,
            parentRecurringExpenseId: originalExpense.parentRecurringExpenseId
        };
        if (originalExpense.employeeId) {
            createObject.employeeId = originalExpense.employeeId;
        }
        if (originalExpense.organizationId) {
            createObject.organizationId = originalExpense.organizationId;
            createObject.splitExpense = originalExpense.splitExpense;
        }
        const newExpense = await this.crudService.create(createObject);
        return newExpense;
    };
    /**
     * Decrease the date of the recurring expense while modifying the date of the conflicting expense
     * 1. Find conflicting expense
     * 2. Update end date of conflicting expense to one month after the input month
     * 3. Remove any expense if is in between
     * 4. This resolves the conflict, now do a simple non conflicting update.
     */
    reduceConflict = async (id, input, originalExpense) => {
        //1. Find conflicting expense
        const conflictingExpense = await this.findConflictingExpense(id, originalExpense.parentRecurringExpenseId, input.startYear, input.startMonth);
        //2. Update end date of conflicting expense to one month before the input start month
        if (conflictingExpense) {
            await this.reduceEndDateToPreviousMonth(conflictingExpense.id, input.startYear, input.startMonth);
        }
        //3. Remove expenses in between, if any
        const { items, total } = await this.findAllExpensesInBetween(originalExpense.id, originalExpense.parentRecurringExpenseId, input.startYear, input.startMonth, originalExpense.startYear, originalExpense.startMonth);
        if (total > 0) {
            const itemsInBetween = {
                id: (0, typeorm_1.In)(items.map((i) => i.id))
            };
            await this.crudService.delete(itemsInBetween);
        }
        //4. This resolves the conflict, now do a simple non conflicting update.
        this.updateExpenseStartDateAndValue(id, input);
    };
    /**
     * Decrease only the end date to the end of previous month without modifying any value
     */
    async reduceEndDateToPreviousMonth(id, startYear, startMonth) {
        const newEndYear = startMonth > 0 ? startYear : startYear - 1;
        const newEndMonth = startMonth > 0 ? startMonth - 1 : 11;
        const newEndDay = (0, core_1.getLastDayOfMonth)(newEndYear, newEndMonth);
        const dateUpdate = {
            endDay: newEndDay,
            endMonth: newEndMonth,
            endYear: newEndYear,
            endDate: new Date(newEndYear, newEndMonth, newEndDay)
        };
        await this.crudService.update(id, dateUpdate);
    }
    /**
     * Find all expenses (except the recurringExpenseId) between a given start and end months of the same parent recurring expense id.
     */
    async findAllExpensesInBetween(recurringExpenseId, parentRecurringExpenseId, updatedStartYear, updatedStartMonth, currentStartYear, currentStartMonth) {
        const lastDayOfMonth = (0, core_1.getLastDayOfMonth)(currentStartYear, currentStartMonth);
        const currentStartDate = new Date(currentStartYear, currentStartMonth, lastDayOfMonth);
        const updatedStartDate = new Date(updatedStartYear, updatedStartMonth, 1);
        return await this.crudService.findAll({
            where: [
                {
                    id: (0, typeorm_1.Not)(recurringExpenseId),
                    parentRecurringExpenseId: parentRecurringExpenseId,
                    startDate: (0, typeorm_1.Between)(updatedStartDate, currentStartDate)
                },
                {
                    id: (0, typeorm_1.Not)(recurringExpenseId),
                    parentRecurringExpenseId: parentRecurringExpenseId,
                    endDate: (0, typeorm_1.Between)(updatedStartDate, currentStartDate)
                }
            ]
        });
    }
    async findConflictingExpense(recurringExpenseId, parentRecurringExpenseId, year, month) {
        const lastDayOfMonth = (0, core_1.getLastDayOfMonth)(year, month);
        const inputStartDate = new Date(year, month, lastDayOfMonth);
        const inputEndDate = new Date(year, month, 1);
        try {
            const expense = await this.crudService.findOneByOptions({
                where: [
                    {
                        parentRecurringExpenseId: parentRecurringExpenseId,
                        startDate: (0, typeorm_1.LessThanOrEqual)(inputStartDate),
                        endDate: (0, typeorm_1.IsNull)()
                    },
                    {
                        parentRecurringExpenseId: parentRecurringExpenseId,
                        startDate: (0, typeorm_1.LessThanOrEqual)(inputStartDate),
                        endDate: (0, typeorm_1.MoreThanOrEqual)(inputEndDate)
                    }
                ]
            });
            //If this is the same expense as the expense we want to update, then it is not a conflicting expense
            return expense.id !== recurringExpenseId ? expense : undefined;
        }
        catch (error) {
            //Ignore, this means record not found.
        }
        return undefined;
    }
}
exports.RecurringExpenseEditHandler = RecurringExpenseEditHandler;
//# sourceMappingURL=recurring-expense.edit.handler.js.map
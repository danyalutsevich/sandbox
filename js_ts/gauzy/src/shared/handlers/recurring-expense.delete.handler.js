"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurringExpenseDeleteHandler = void 0;
const contracts_1 = require("../../../plugins/contracts");
const common_1 = require("@nestjs/common");
const core_1 = require("../../core");
/**
 * Deletes a OrganizationRecurringExpense based on command.deleteInput.deletionType:
 *
 * 1. ALL: Delete all entries for an expense (By actually deleting it from the db)
 * 2. FUTURE : Delete only current and future events (By reducing the end date)
 * 3. CURRENT : Delete only one month (By splitting the expense into two)
 *
 * TODO: Fix typescript, remove usage of :any
 */
class RecurringExpenseDeleteHandler {
    crudService;
    constructor(crudService) {
        this.crudService = crudService;
    }
    async executeCommand(id, deleteInput) {
        let result;
        switch (deleteInput.deletionType) {
            case contracts_1.RecurringExpenseDeletionEnum.ALL:
                const deleteId = {
                    id
                };
                result = await this.crudService.delete(deleteId);
                break;
            case contracts_1.RecurringExpenseDeletionEnum.FUTURE:
                result = await this.updateEndDateToLastMonth(id, deleteInput);
                break;
            case contracts_1.RecurringExpenseDeletionEnum.CURRENT:
                result = await this.deleteOneMonthOnly(id, deleteInput);
                break;
            default:
                throw new common_1.BadRequestException(`Unsupported deletion type ${deleteInput.deletionType}`);
        }
        return result;
    }
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
    async deleteOneMonthOnly(id, deleteInput) {
        const originalExpense = await this.crudService.findOneByIdString(id);
        const deleteDate = new Date(deleteInput.year, deleteInput.month);
        const deleteId = {
            id
        };
        if (deleteDate.getTime() === originalExpense.startDate.getTime() &&
            originalExpense.endDate &&
            originalExpense.endDate.getTime() === deleteDate.getTime()) {
            //Only delete
            return await this.crudService.delete(deleteId);
        }
        else if (deleteDate.getTime() === originalExpense.startDate.getTime()) {
            //Delete and create for next month onwards
            await this.crudService.delete(deleteId);
            return await this.createExpenseFromNextMonth(deleteInput, originalExpense);
        }
        else {
            await this.updateEndDateToLastMonth(id, deleteInput);
            return await this.createExpenseFromNextMonth(deleteInput, originalExpense);
        }
    }
    /**
     * Updates the end date to one month before deleteInput.month
     */
    async updateEndDateToLastMonth(id, deleteInput) {
        const endMonth = deleteInput.month > 0 ? deleteInput.month - 1 : 11; //Because input.startMonth needs to be deleted
        const endYear = deleteInput.month > 0 ? deleteInput.year : deleteInput.year - 1;
        const endDay = (0, core_1.getLastDayOfMonth)(endYear, endMonth);
        const updateOptions = {
            endDay,
            endMonth,
            endYear,
            endDate: new Date(endYear, endMonth, endDay)
        };
        return await this.crudService.update(id, updateOptions);
    }
    /**
     * Creates a copy of the originalExpense but with start date are one month more than deleteInput
     * By default, start date is the first day of the month & end date is the last date of the month
     *
     * @param deleteInput The delete input
     * @param originalExpense The original (non modified) expense
     */
    async createExpenseFromNextMonth(deleteInput, originalExpense) {
        const nextStartDate = new Date(deleteInput.year, deleteInput.month + 1, 1);
        // If there is still more time left after deleting one month from in between
        if (!originalExpense.endDate ||
            nextStartDate.getTime() <= originalExpense.endDate.getTime()) {
            const createOptions = {
                startDay: 1,
                startMonth: deleteInput.month + 1,
                startYear: deleteInput.year,
                startDate: nextStartDate,
                endDay: (0, core_1.getLastDayOfMonth)(originalExpense.endYear, originalExpense.endMonth),
                endMonth: originalExpense.endMonth,
                endYear: originalExpense.endYear,
                endDate: originalExpense.endDate,
                categoryName: originalExpense.categoryName,
                currency: originalExpense.currency,
                value: originalExpense.value,
                parentRecurringExpenseId: originalExpense.parentRecurringExpenseId
            };
            if (originalExpense.organizationId) {
                createOptions.organizationId = originalExpense.organizationId;
                createOptions.splitExpense = originalExpense.splitExpense;
            }
            if (originalExpense.employeeId) {
                createOptions.employeeId = originalExpense.employeeId;
            }
            //Create new expense for the remaining time
            return await this.crudService.create(createOptions);
        }
        return;
    }
}
exports.RecurringExpenseDeleteHandler = RecurringExpenseDeleteHandler;
//# sourceMappingURL=recurring-expense.delete.handler.js.map
import { ICommandHandler } from '@nestjs/cqrs';
import { ExpenseCategoryUpdateCommand } from './../expense-category-update.command';
import { ExpenseCategoriesService } from './../../expense-categories.service';
export declare class ExpenseCategoryUpdateHandler implements ICommandHandler<ExpenseCategoryUpdateCommand> {
    private readonly _expenseCategoryService;
    constructor(_expenseCategoryService: ExpenseCategoriesService);
    execute(command: ExpenseCategoryUpdateCommand): Promise<import("../../expense-category.entity").ExpenseCategory>;
}

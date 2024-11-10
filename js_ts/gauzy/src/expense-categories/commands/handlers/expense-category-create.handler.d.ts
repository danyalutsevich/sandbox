import { ICommandHandler } from '@nestjs/cqrs';
import { ExpenseCategoryCreateCommand } from './../expense-category-create.command';
import { ExpenseCategoriesService } from './../../expense-categories.service';
export declare class ExpenseCategoryCreateHandler implements ICommandHandler<ExpenseCategoryCreateCommand> {
    private readonly _expenseCategoryService;
    constructor(_expenseCategoryService: ExpenseCategoriesService);
    execute(command: ExpenseCategoryCreateCommand): Promise<import("../../expense-category.entity").ExpenseCategory>;
}

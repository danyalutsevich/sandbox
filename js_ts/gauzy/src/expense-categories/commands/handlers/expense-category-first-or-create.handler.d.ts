import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { ExpenseCategoryFirstOrCreateCommand } from './../expense-category-first-or-create.command';
import { ExpenseCategoriesService } from './../../expense-categories.service';
export declare class ExpenseCategoryFirstOrCreateHandler implements ICommandHandler<ExpenseCategoryFirstOrCreateCommand> {
    private readonly _expenseCategoryService;
    private readonly _commandBus;
    constructor(_expenseCategoryService: ExpenseCategoriesService, _commandBus: CommandBus);
    execute(command: ExpenseCategoryFirstOrCreateCommand): Promise<any>;
}

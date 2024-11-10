import { CommandBus } from '@nestjs/cqrs';
import { IExpenseCategory, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController, PaginationParams } from './../core/crud';
import { ExpenseCategoriesService } from './expense-categories.service';
import { ExpenseCategory } from './expense-category.entity';
import { CreateExpenseCategoryDTO, UpdateExpenseCategoryDTO } from './dto';
export declare class ExpenseCategoriesController extends CrudController<ExpenseCategory> {
    private readonly _expenseCategoriesService;
    private readonly _commandBus;
    constructor(_expenseCategoriesService: ExpenseCategoriesService, _commandBus: CommandBus);
    /**
     * GET all expense categories by pagination
     *
     * @param options
     * @returns
     */
    pagination(options: PaginationParams<ExpenseCategory>): Promise<IPagination<IExpenseCategory>>;
    /**
     * GET all expense categories
     *
     *
     * @param data
     * @returns
     */
    findAll(options: PaginationParams<ExpenseCategory>): Promise<IPagination<IExpenseCategory>>;
    /**
     * CREATE expense category
     *
     * @param entity
     * @returns
     */
    create(entity: CreateExpenseCategoryDTO): Promise<IExpenseCategory>;
    /**
     * UPDATE expense category by id
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: string, entity: UpdateExpenseCategoryDTO): Promise<IExpenseCategory>;
}

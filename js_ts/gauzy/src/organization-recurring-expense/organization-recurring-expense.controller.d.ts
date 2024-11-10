import { IStartUpdateTypeInfo, IOrganizationRecurringExpenseForEmployeeOutput, IRecurringExpenseEditInput, IPagination } from '../../plugins/contracts/dist/index';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CrudController } from './../core/crud';
import { OrganizationRecurringExpense } from './organization-recurring-expense.entity';
import { OrganizationRecurringExpenseService } from './organization-recurring-expense.service';
export declare class OrganizationRecurringExpenseController extends CrudController<OrganizationRecurringExpense> {
    private readonly commandBus;
    private readonly queryBus;
    private readonly organizationRecurringExpenseService;
    constructor(commandBus: CommandBus, queryBus: QueryBus, organizationRecurringExpenseService: OrganizationRecurringExpenseService);
    /**
     * GET organization recurring expense by month
     *
     * @param data
     * @returns
     */
    findAllExpenses(data: any): Promise<IPagination<OrganizationRecurringExpense>>;
    /**
     * GET date update type & conflicting expenses
     *
     * @param data
     * @returns
     */
    findStartDateUpdateType(data: any): Promise<IStartUpdateTypeInfo>;
    /**
     * GET organization recurring expenses/split expense for employee
     *
     * @param data
     * @param orgId
     * @returns
     */
    getSplitExpensesForEmployee(data: any, organizationId: string): Promise<IPagination<IOrganizationRecurringExpenseForEmployeeOutput>>;
    /**
     * GET all organization recurring expenses
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<OrganizationRecurringExpense>>;
    /**
     * CREATE organization recurring expense
     *
     * @param entity
     * @returns
     */
    create(entity: OrganizationRecurringExpense): Promise<OrganizationRecurringExpense>;
    /**
     * UPDATE organization recurring expense by id
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: string, entity: IRecurringExpenseEditInput): Promise<any>;
    /**
     * DELETE organization recurring expense by id
     *
     * @param id
     * @param data
     * @returns
     */
    delete(id: string, data: any): Promise<any>;
}

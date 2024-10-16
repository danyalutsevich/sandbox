import { ISplitExpenseOutput, IExpenseReportData, IExpense, IPagination, IEmployee } from '../../plugins/contracts/dist/index';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DeleteResult, FindOptionsWhere } from 'typeorm';
import { CrudController, PaginationParams } from '../core/crud';
import { EmployeeService } from '../employee/employee.service';
import { Expense } from './expense.entity';
import { ExpenseService } from './expense.service';
import { ExpenseMapService } from './expense.map.service';
import { CreateExpenseDTO, DeleteExpenseDTO, UpdateExpenseDTO } from './dto';
import { ExpenseReportQueryDTO } from './dto/query';
export declare class ExpenseController extends CrudController<Expense> {
    private readonly expenseService;
    private readonly expenseMapService;
    private readonly employeeService;
    private readonly commandBus;
    private readonly queryBus;
    constructor(expenseService: ExpenseService, expenseMapService: ExpenseMapService, employeeService: EmployeeService, commandBus: CommandBus, queryBus: QueryBus);
    /**
     * GET expense count
     *
     * @param options
     * @returns
     */
    getCount(options: FindOptionsWhere<Expense>): Promise<number>;
    /**
     * GET expense for same tenant
     *
     * @param options
     * @returns
     */
    pagination(params: PaginationParams<Expense>): Promise<IPagination<IExpense>>;
    findMyExpenseWithSplitIncluded(data: any): Promise<IPagination<IExpense>>;
    findAllSplitExpenses(data: any, employeeId: IEmployee['id']): Promise<IPagination<ISplitExpenseOutput>>;
    getExpenseReport(options: ExpenseReportQueryDTO): Promise<IExpenseReportData[]>;
    getDailyReportChartData(options: ExpenseReportQueryDTO): Promise<{
        date: string;
        value: {
            expense: any;
        };
    }[]>;
    findAll(data: any): Promise<IPagination<IExpense>>;
    /**
     * Find expense by primary ID
     *
     * @param id
     * @returns
     */
    findById(id: IExpense['id']): Promise<IExpense>;
    /**
     * Create Expense
     *
     * @param entity
     * @returns
     */
    create(entity: CreateExpenseDTO): Promise<IExpense>;
    /**
     * Update Expense
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: string, entity: UpdateExpenseDTO): Promise<IExpense>;
    /**
     * Delete Expense
     *
     * @param expenseId
     * @param options
     * @returns
     */
    delete(expenseId: string, options: DeleteExpenseDTO): Promise<DeleteResult>;
}

import { IStartUpdateTypeInfo, IRecurringExpenseEditInput, IEmployeeRecurringExpense, IPagination } from '../../plugins/contracts/dist/index';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CrudController, PaginationParams } from './../core/crud';
import { CreateEmployeeRecurringExpenseDTO, UpdateEmployeeRecurringExpenseDTO } from './dto';
import { EmployeeRecurringExpenseQueryDTO } from './dto/employee-recurring-expense-query.dto';
import { EmployeeRecurringExpense } from './employee-recurring-expense.entity';
import { EmployeeRecurringExpenseService } from './employee-recurring-expense.service';
export declare class EmployeeRecurringExpenseController extends CrudController<EmployeeRecurringExpense> {
    private readonly employeeRecurringExpenseService;
    private readonly queryBus;
    private readonly commandBus;
    constructor(employeeRecurringExpenseService: EmployeeRecurringExpenseService, queryBus: QueryBus, commandBus: CommandBus);
    findAllByMonth(options: EmployeeRecurringExpenseQueryDTO): Promise<IPagination<IEmployeeRecurringExpense>>;
    findStartDateUpdateType(data: any): Promise<IStartUpdateTypeInfo>;
    findAll(params: PaginationParams<EmployeeRecurringExpense>): Promise<IPagination<IEmployeeRecurringExpense>>;
    create(entity: CreateEmployeeRecurringExpenseDTO): Promise<IEmployeeRecurringExpense>;
    update(id: string, entity: UpdateEmployeeRecurringExpenseDTO): Promise<IRecurringExpenseEditInput>;
    delete(id: string, data: any): Promise<any>;
}

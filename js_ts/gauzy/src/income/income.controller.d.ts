import { CommandBus } from '@nestjs/cqrs';
import { IIncome, IPagination } from '../../plugins/contracts/dist/index';
import { DeleteResult, FindOptionsWhere } from 'typeorm';
import { CrudController, PaginationParams } from './../core/crud';
import { EmployeeService } from '../employee/employee.service';
import { Income } from './income.entity';
import { IncomeService } from './income.service';
import { CreateIncomeDTO, DeleteIncomeDTO, UpdateIncomeDTO } from './dto';
export declare class IncomeController extends CrudController<Income> {
    private readonly incomeService;
    private readonly employeeService;
    private readonly commandBus;
    constructor(incomeService: IncomeService, employeeService: EmployeeService, commandBus: CommandBus);
    findMyIncome(data: any): Promise<IPagination<IIncome>>;
    /**
     * GET income count
     *
     * @param options
     * @returns
     */
    getCount(options: FindOptionsWhere<Income>): Promise<number>;
    pagination(params: PaginationParams<Income>): Promise<IPagination<IIncome>>;
    findAll(data: any): Promise<IPagination<IIncome>>;
    /**
     * Find income by primary ID
     *
     * @param id
     * @returns
     */
    findById(id: string): Promise<IIncome>;
    create(entity: CreateIncomeDTO): Promise<IIncome>;
    update(id: string, entity: UpdateIncomeDTO): Promise<IIncome>;
    delete(incomeId: string, options: DeleteIncomeDTO): Promise<DeleteResult>;
}

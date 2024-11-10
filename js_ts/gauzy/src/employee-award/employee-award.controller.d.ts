import { DeleteResult, UpdateResult } from 'typeorm';
import { IEmployeeAward, IPagination } from '../../plugins/contracts/dist/index';
import { EmployeeAward } from './employee-award.entity';
import { EmployeeAwardService } from './employee-award.service';
import { CrudController, PaginationParams } from './../core/crud';
import { CreateEmployeeAwardDTO, UpdateEmployeeAwardDTO } from './dto';
export declare class EmployeeAwardController extends CrudController<EmployeeAward> {
    private readonly employeeAwardService;
    constructor(employeeAwardService: EmployeeAwardService);
    findAll(params: PaginationParams<EmployeeAward>): Promise<IPagination<IEmployeeAward>>;
    create(entity: CreateEmployeeAwardDTO): Promise<IEmployeeAward>;
    update(id: IEmployeeAward['id'], entity: UpdateEmployeeAwardDTO): Promise<IEmployeeAward | UpdateResult>;
    delete(id: IEmployeeAward['id']): Promise<DeleteResult>;
}

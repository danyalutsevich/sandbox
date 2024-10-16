import { IEmployeeLevel, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController } from './../core/crud';
import { EmployeeLevel } from './employee-level.entity';
import { EmployeeLevelService } from './employee-level.service';
export declare class EmployeeLevelController extends CrudController<EmployeeLevel> {
    private readonly employeeLevelService;
    constructor(employeeLevelService: EmployeeLevelService);
    findAll(data: any): Promise<IPagination<IEmployeeLevel>>;
    update(id: string, entity: EmployeeLevel, ...options: any[]): Promise<IEmployeeLevel>;
}

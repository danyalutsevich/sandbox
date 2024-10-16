import { Repository } from 'typeorm';
import { EmployeeLevel } from '../employee-level.entity';
export declare class TypeOrmEmployeeLevelRepository extends Repository<EmployeeLevel> {
    readonly repository: Repository<EmployeeLevel>;
    constructor(repository: Repository<EmployeeLevel>);
}

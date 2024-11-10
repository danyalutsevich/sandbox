import { Repository } from 'typeorm';
import { EmployeeAward } from '../employee-award.entity';
export declare class TypeOrmEmployeeAwardRepository extends Repository<EmployeeAward> {
    readonly repository: Repository<EmployeeAward>;
    constructor(repository: Repository<EmployeeAward>);
}

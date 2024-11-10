import { Repository } from 'typeorm';
import { EmployeeSetting } from '../employee-setting.entity';
export declare class TypeOrmEmployeeSettingRepository extends Repository<EmployeeSetting> {
    readonly repository: Repository<EmployeeSetting>;
    constructor(repository: Repository<EmployeeSetting>);
}

import { TenantAwareCrudService } from './../core/crud';
import { TypeOrmEmployeeSettingRepository } from './repository/type-orm-employee-setting.repository';
import { MikroOrmEmployeeSettingRepository } from './repository/mikro-orm-employee-setting.repository';
import { EmployeeSetting } from './employee-setting.entity';
export declare class EmployeeSettingService extends TenantAwareCrudService<EmployeeSetting> {
    constructor(typeOrmEmployeeSettingRepository: TypeOrmEmployeeSettingRepository, mikroOrmEmployeeSettingRepository: MikroOrmEmployeeSettingRepository);
}

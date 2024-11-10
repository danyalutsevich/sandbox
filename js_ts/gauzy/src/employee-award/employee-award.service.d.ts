import { TenantAwareCrudService } from './../core/crud';
import { TypeOrmEmployeeAwardRepository } from './repository/type-orm-employee-award.repository';
import { MikroOrmEmployeeAwardRepository } from './repository/mikro-orm-employee-award.repository';
import { EmployeeAward } from './employee-award.entity';
export declare class EmployeeAwardService extends TenantAwareCrudService<EmployeeAward> {
    constructor(typeOrmEmployeeAwardRepository: TypeOrmEmployeeAwardRepository, mikroOrmEmployeeAwardRepository: MikroOrmEmployeeAwardRepository);
}

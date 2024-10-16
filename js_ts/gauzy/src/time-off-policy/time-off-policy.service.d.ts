import { ITimeOffPolicyCreateInput, ITimeOffPolicyUpdateInput } from '../../plugins/contracts/dist/index';
import { TimeOffPolicy } from './time-off-policy.entity';
import { TenantAwareCrudService } from './../core/crud';
import { TypeOrmTimeOffPolicyRepository } from './repository/type-orm-time-off-policy.repository';
import { MikroOrmTimeOffPolicyRepository } from './repository/mikro-orm-time-off-policy.repository';
import { TypeOrmEmployeeRepository } from '../employee/repository/type-orm-employee.repository';
import { MikroOrmEmployeeRepository } from '../employee/repository/mikro-orm-employee.repository';
export declare class TimeOffPolicyService extends TenantAwareCrudService<TimeOffPolicy> {
    private typeOrmEmployeeRepository;
    constructor(typeOrmTimeOffPolicyRepository: TypeOrmTimeOffPolicyRepository, mikroOrmTimeOffPolicyRepository: MikroOrmTimeOffPolicyRepository, typeOrmEmployeeRepository: TypeOrmEmployeeRepository, mikroOrmEmployeeRepository: MikroOrmEmployeeRepository);
    create(entity: ITimeOffPolicyCreateInput): Promise<TimeOffPolicy>;
    update(id: string, entity: ITimeOffPolicyUpdateInput): Promise<TimeOffPolicy>;
}

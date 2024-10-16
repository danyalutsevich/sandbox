import { Repository } from 'typeorm';
import { TimeOffPolicy } from '../time-off-policy.entity';
export declare class TypeOrmTimeOffPolicyRepository extends Repository<TimeOffPolicy> {
    readonly repository: Repository<TimeOffPolicy>;
    constructor(repository: Repository<TimeOffPolicy>);
}

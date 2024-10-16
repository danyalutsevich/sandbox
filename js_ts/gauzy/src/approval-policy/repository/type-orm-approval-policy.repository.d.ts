import { Repository } from 'typeorm';
import { ApprovalPolicy } from '../approval-policy.entity';
export declare class TypeOrmApprovalPolicyRepository extends Repository<ApprovalPolicy> {
    readonly repository: Repository<ApprovalPolicy>;
    constructor(repository: Repository<ApprovalPolicy>);
}

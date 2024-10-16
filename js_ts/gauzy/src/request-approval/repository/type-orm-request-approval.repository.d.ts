import { Repository } from 'typeorm';
import { RequestApproval } from '../request-approval.entity';
export declare class TypeOrmRequestApprovalRepository extends Repository<RequestApproval> {
    readonly repository: Repository<RequestApproval>;
    constructor(repository: Repository<RequestApproval>);
}

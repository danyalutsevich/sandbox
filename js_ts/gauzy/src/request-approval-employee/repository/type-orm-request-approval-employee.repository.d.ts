import { Repository } from 'typeorm';
import { RequestApprovalEmployee } from '../request-approval-employee.entity';
export declare class TypeOrmRequestApprovalEmployeeRepository extends Repository<RequestApprovalEmployee> {
    readonly repository: Repository<RequestApprovalEmployee>;
    constructor(repository: Repository<RequestApprovalEmployee>);
}

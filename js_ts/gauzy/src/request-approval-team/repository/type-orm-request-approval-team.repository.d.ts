import { Repository } from 'typeorm';
import { RequestApprovalTeam } from '../request-approval-team.entity';
export declare class TypeOrmRequestApprovalTeamRepository extends Repository<RequestApprovalTeam> {
    readonly repository: Repository<RequestApprovalTeam>;
    constructor(repository: Repository<RequestApprovalTeam>);
}

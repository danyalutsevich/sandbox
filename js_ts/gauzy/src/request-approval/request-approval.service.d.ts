import { FindManyOptions } from 'typeorm';
import { IRequestApproval, IRequestApprovalCreateInput, IRequestApprovalFindInput, IPagination } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { RequestApproval } from './request-approval.entity';
import { MikroOrmRequestApprovalRepository } from './repository/mikro-orm-request-approval.repository';
import { TypeOrmRequestApprovalRepository } from './repository/type-orm-request-approval.repository';
import { TypeOrmEmployeeRepository } from '../employee/repository/type-orm-employee.repository';
import { MikroOrmEmployeeRepository } from '../employee/repository/mikro-orm-employee.repository';
import { TypeOrmOrganizationTeamRepository } from '../organization-team/repository/type-orm-organization-team.repository';
import { MikroOrmOrganizationTeamRepository } from '../organization-team/repository/mikro-orm-organization-team.repository';
export declare class RequestApprovalService extends TenantAwareCrudService<RequestApproval> {
    private typeOrmEmployeeRepository;
    private typeOrmOrganizationTeamRepository;
    constructor(typeOrmRequestApprovalRepository: TypeOrmRequestApprovalRepository, mikroOrmRequestApprovalRepository: MikroOrmRequestApprovalRepository, typeOrmEmployeeRepository: TypeOrmEmployeeRepository, mikroOrmEmployeeRepository: MikroOrmEmployeeRepository, typeOrmOrganizationTeamRepository: TypeOrmOrganizationTeamRepository, mikroOrmOrganizationTeamRepository: MikroOrmOrganizationTeamRepository);
    findAllRequestApprovals(filter: FindManyOptions<RequestApproval>, findInput: IRequestApprovalFindInput): Promise<IPagination<IRequestApproval>>;
    findRequestApprovalsByEmployeeId(id: string, relations: string[], findInput?: IRequestApprovalFindInput): Promise<IPagination<IRequestApproval>>;
    createRequestApproval(entity: IRequestApprovalCreateInput): Promise<RequestApproval>;
    updateRequestApproval(id: string, entity: IRequestApprovalCreateInput): Promise<RequestApproval>;
    updateStatusRequestApprovalByAdmin(id: string, status: number): Promise<RequestApproval>;
    updateStatusRequestApprovalByEmployeeOrTeam(id: string, status: number): Promise<RequestApproval>;
}

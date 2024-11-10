import { IApprovalPolicy, IListQueryInput, IRequestApprovalFindInput, IPagination, IApprovalPolicyCreateInput } from '../../plugins/contracts/dist/index';
import { ApprovalPolicy } from './approval-policy.entity';
import { PaginationParams, TenantAwareCrudService } from './../core/crud';
import { TypeOrmApprovalPolicyRepository } from './repository/type-orm-approval-policy.repository';
import { MikroOrmApprovalPolicyRepository } from './repository/mikro-orm-approval-policy.repository';
export declare class ApprovalPolicyService extends TenantAwareCrudService<ApprovalPolicy> {
    constructor(typeOrmApprovalPolicyRepository: TypeOrmApprovalPolicyRepository, mikroOrmApprovalPolicyRepository: MikroOrmApprovalPolicyRepository);
    /**
     * GET approval policies by pagination
     *
     * @param options
     * @returns
     */
    pagination(options: PaginationParams<ApprovalPolicy>): Promise<IPagination<ApprovalPolicy>>;
    findAllApprovalPolicies(options: PaginationParams<ApprovalPolicy>): Promise<IPagination<IApprovalPolicy>>;
    findApprovalPoliciesForRequestApproval({ findInput, relations }: IListQueryInput<IRequestApprovalFindInput>): Promise<IPagination<IApprovalPolicy>>;
    create(entity: IApprovalPolicyCreateInput): Promise<ApprovalPolicy>;
    update(id: string, entity: IApprovalPolicyCreateInput): Promise<ApprovalPolicy>;
}

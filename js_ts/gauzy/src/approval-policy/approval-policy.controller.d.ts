import { IPagination, IApprovalPolicy, IListQueryInput, IRequestApprovalFindInput } from '../../plugins/contracts/dist/index';
import { CommandBus } from '@nestjs/cqrs';
import { CrudController, PaginationParams } from '../core';
import { ApprovalPolicy } from './approval-policy.entity';
import { ApprovalPolicyService } from './approval-policy.service';
import { CreateApprovalPolicyDTO, UpdateApprovalPolicyDTO } from './dto';
export declare class ApprovalPolicyController extends CrudController<ApprovalPolicy> {
    private readonly approvalPolicyService;
    private readonly commandBus;
    constructor(approvalPolicyService: ApprovalPolicyService, commandBus: CommandBus);
    /**
     * GET all approval policies except time off and equipment sharing policy
     *
     * @param data
     * @returns
     */
    findApprovalPoliciesForRequestApproval(data: IListQueryInput<IRequestApprovalFindInput>): Promise<IPagination<IApprovalPolicy>>;
    /**
     * GET approval policies by pagination
     *
     * @param options
     * @returns
     */
    pagination(options: PaginationParams<ApprovalPolicy>): Promise<IPagination<IApprovalPolicy>>;
    /**
     * GET all approval policies
     *
     * @param data
     * @returns
     */
    findAll(options: PaginationParams<ApprovalPolicy>): Promise<IPagination<IApprovalPolicy>>;
    /**
     * CREATE approval policy
     *
     * @param entity
     * @returns
     */
    create(entity: CreateApprovalPolicyDTO): Promise<IApprovalPolicy>;
    /**
     * UPDATE approval policy by id
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: string, entity: UpdateApprovalPolicyDTO): Promise<IApprovalPolicy>;
}

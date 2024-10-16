import { IApprovalPolicy, IPagination } from '../../../../plugins/contracts/dist/index';
import { ICommandHandler } from '@nestjs/cqrs';
import { ApprovalPolicyService } from '../../approval-policy.service';
import { RequestApprovalPolicyGetCommand } from '../request-approval-policy.get.command';
export declare class RequestApprovalPolicyGetHandler implements ICommandHandler<RequestApprovalPolicyGetCommand> {
    private readonly approvalPolicyService;
    constructor(approvalPolicyService: ApprovalPolicyService);
    execute(command: RequestApprovalPolicyGetCommand): Promise<IPagination<IApprovalPolicy>>;
}

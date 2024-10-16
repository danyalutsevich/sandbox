import { ICommandHandler } from '@nestjs/cqrs';
import { ApprovalPolicyService } from '../../approval-policy.service';
import { ApprovalPolicyCreateCommand } from '../approval-policy.create.command';
export declare class ApprovalPolicyCreateHandler implements ICommandHandler<ApprovalPolicyCreateCommand> {
    private readonly approvalPolicyService;
    constructor(approvalPolicyService: ApprovalPolicyService);
    execute(command: ApprovalPolicyCreateCommand): Promise<any>;
}

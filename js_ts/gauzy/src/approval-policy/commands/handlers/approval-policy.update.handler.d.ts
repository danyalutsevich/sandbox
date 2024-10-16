import { ICommandHandler } from '@nestjs/cqrs';
import { ApprovalPolicyService } from '../../approval-policy.service';
import { ApprovalPolicyUpdateCommand } from '../approval-policy.update.command';
export declare class ApprovalPolicyUpdateHandler implements ICommandHandler<ApprovalPolicyUpdateCommand> {
    private readonly approvalPolicyService;
    constructor(approvalPolicyService: ApprovalPolicyService);
    execute(command: ApprovalPolicyUpdateCommand): Promise<any>;
}

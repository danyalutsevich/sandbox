import { IApprovalPolicy, IApprovalPolicyUpdateInput } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class ApprovalPolicyUpdateCommand implements ICommand {
    readonly id: IApprovalPolicy['id'];
    readonly input: IApprovalPolicyUpdateInput;
    static readonly type = "[ApprovalPolicy] Update";
    constructor(id: IApprovalPolicy['id'], input: IApprovalPolicyUpdateInput);
}

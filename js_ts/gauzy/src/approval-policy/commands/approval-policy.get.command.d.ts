import { IApprovalPolicy } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
import { PaginationParams } from './../../core/crud';
export declare class ApprovalPolicyGetCommand implements ICommand {
    readonly input: PaginationParams<IApprovalPolicy>;
    static readonly type = "[Approval Policy] Get";
    constructor(input: PaginationParams<IApprovalPolicy>);
}

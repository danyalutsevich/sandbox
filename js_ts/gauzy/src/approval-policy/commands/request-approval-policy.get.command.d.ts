import { IListQueryInput, IRequestApprovalFindInput } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class RequestApprovalPolicyGetCommand implements ICommand {
    readonly input: IListQueryInput<IRequestApprovalFindInput>;
    static readonly type = "[RequestApprovalPolicy] Get";
    constructor(input: IListQueryInput<IRequestApprovalFindInput>);
}

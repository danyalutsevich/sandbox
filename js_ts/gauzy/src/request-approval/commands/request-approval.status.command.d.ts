import { ICommand } from '@nestjs/cqrs';
export declare class RequestApprovalStatusCommand implements ICommand {
    readonly requestApprovalId: string;
    readonly status: number;
    static readonly type = "[RequestApproval] Status";
    constructor(requestApprovalId: string, status: number);
}

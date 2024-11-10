import { ICommand } from '@nestjs/cqrs';
export declare class InvoiceGenerateLinkCommand implements ICommand {
    readonly invoiceId: string;
    static readonly type = "[Invoice] Generate Link";
    constructor(invoiceId: string);
}

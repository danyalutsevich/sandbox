import { ICommand } from '@nestjs/cqrs';
export declare class InvoiceDeleteCommand implements ICommand {
    readonly invoiceId: string;
    static readonly type = "[Invoice] Delete";
    constructor(invoiceId: string);
}

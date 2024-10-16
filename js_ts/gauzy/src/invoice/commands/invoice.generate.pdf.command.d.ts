import { ICommand } from '@nestjs/cqrs';
export declare class InvoiceGeneratePdfCommand implements ICommand {
    readonly invoiceId: string;
    readonly locale: string;
    static readonly type = "[Invoice] Generate Pdf";
    constructor(invoiceId: string, locale: string);
}

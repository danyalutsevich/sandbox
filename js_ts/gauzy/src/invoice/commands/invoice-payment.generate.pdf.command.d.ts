import { ICommand } from '@nestjs/cqrs';
export declare class InvoicePaymentGeneratePdfCommand implements ICommand {
    readonly invoiceId: string;
    readonly locale: string;
    static readonly type = "[Invoice Payment] Generate Pdf";
    constructor(invoiceId: string, locale: string);
}

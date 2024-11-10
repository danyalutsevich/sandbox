/// <reference types="node" />
import { ICommandHandler } from '@nestjs/cqrs';
import { InvoiceService } from '../../invoice.service';
import { InvoicePaymentGeneratePdfCommand } from '../invoice-payment.generate.pdf.command';
export declare class InvoicePaymentGeneratePdfHandler implements ICommandHandler<InvoicePaymentGeneratePdfCommand> {
    private readonly invoiceService;
    constructor(invoiceService: InvoiceService);
    execute(command: InvoicePaymentGeneratePdfCommand): Promise<Buffer>;
}

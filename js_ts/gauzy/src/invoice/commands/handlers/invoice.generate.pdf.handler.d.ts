/// <reference types="node" />
import { ICommandHandler } from '@nestjs/cqrs';
import { InvoiceService } from '../../invoice.service';
import { InvoiceGeneratePdfCommand } from '../invoice.generate.pdf.command';
export declare class InvoiceGeneratePdfHandler implements ICommandHandler<InvoiceGeneratePdfCommand> {
    private readonly invoiceService;
    constructor(invoiceService: InvoiceService);
    execute(command: InvoiceGeneratePdfCommand): Promise<Buffer>;
}

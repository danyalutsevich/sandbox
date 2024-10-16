import { ICommandHandler } from '@nestjs/cqrs';
import { InvoiceService } from '../../invoice.service';
import { InvoiceSendEmailCommand } from '../invoice.send.email.command';
export declare class InvoiceSendEmailHandler implements ICommandHandler<InvoiceSendEmailCommand> {
    private readonly invoiceService;
    constructor(invoiceService: InvoiceService);
    execute(command: InvoiceSendEmailCommand): Promise<any>;
}

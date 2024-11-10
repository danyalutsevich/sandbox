import { IInvoice } from '../../../../plugins/contracts/dist/index';
import { ICommandHandler } from '@nestjs/cqrs';
import { InvoiceService } from '../../invoice.service';
import { InvoiceCreateCommand } from '../invoice.create.command';
export declare class InvoiceCreateHandler implements ICommandHandler<InvoiceCreateCommand> {
    private readonly invoiceService;
    constructor(invoiceService: InvoiceService);
    execute(command: InvoiceCreateCommand): Promise<IInvoice>;
}

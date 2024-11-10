import { IInvoice } from '../../../../plugins/contracts/dist/index';
import { ICommandHandler } from '@nestjs/cqrs';
import { InvoiceService } from '../../invoice.service';
import { InvoiceUpdateCommand } from '../invoice.update.command';
export declare class InvoiceUpdateHandler implements ICommandHandler<InvoiceUpdateCommand> {
    private readonly invoiceService;
    constructor(invoiceService: InvoiceService);
    execute(command: InvoiceUpdateCommand): Promise<IInvoice>;
}

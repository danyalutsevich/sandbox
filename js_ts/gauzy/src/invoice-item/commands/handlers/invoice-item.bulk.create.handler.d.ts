import { ICommandHandler } from '@nestjs/cqrs';
import { InvoiceItemBulkCreateCommand } from '../invoice-item.bulk.create.command';
import { InvoiceItemService } from '../../invoice-item.service';
import { InvoiceItem } from '../../invoice-item.entity';
export declare class InvoiceItemBulkCreateHandler implements ICommandHandler<InvoiceItemBulkCreateCommand> {
    private readonly invoiceItemService;
    constructor(invoiceItemService: InvoiceItemService);
    execute(command: InvoiceItemBulkCreateCommand): Promise<InvoiceItem[]>;
}

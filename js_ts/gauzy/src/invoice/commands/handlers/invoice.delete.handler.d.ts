import { ICommandHandler } from '@nestjs/cqrs';
import { DeleteResult } from 'typeorm';
import { InvoiceService } from '../../invoice.service';
import { InvoiceDeleteCommand } from '../invoice.delete.command';
export declare class InvoiceDeleteHandler implements ICommandHandler<InvoiceDeleteCommand> {
    private readonly invoiceService;
    constructor(invoiceService: InvoiceService);
    execute(command: InvoiceDeleteCommand): Promise<DeleteResult>;
}

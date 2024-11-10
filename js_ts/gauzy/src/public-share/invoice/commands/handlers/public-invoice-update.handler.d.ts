import { IInvoice } from '../../../../../plugins/contracts/dist/index';
import { ICommandHandler } from '@nestjs/cqrs';
import { UpdateResult } from 'typeorm';
import { PublicInvoiceUpdateCommand } from '../public-invoice-update.command';
import { PublicInvoiceService } from './../../public-invoice.service';
export declare class PublicInvoiceUpdateHandler implements ICommandHandler<PublicInvoiceUpdateCommand> {
    private readonly publicInvoiceService;
    constructor(publicInvoiceService: PublicInvoiceService);
    execute(command: PublicInvoiceUpdateCommand): Promise<IInvoice | UpdateResult>;
}

import { IInvoice } from '../../../../../plugins/contracts/dist/index';
import { IQueryHandler } from '@nestjs/cqrs';
import { FindPublicInvoiceQuery } from '../find-public-invoice.query';
import { PublicInvoiceService } from './../../public-invoice.service';
export declare class FindPublicInvoiceHandler implements IQueryHandler<FindPublicInvoiceQuery> {
    private readonly publicInvoiceService;
    constructor(publicInvoiceService: PublicInvoiceService);
    execute(query: FindPublicInvoiceQuery): Promise<IInvoice>;
}

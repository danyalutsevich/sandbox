import { IInvoiceEstimateHistory, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController } from './../core/crud';
import { InvoiceEstimateHistory } from './invoice-estimate-history.entity';
import { InvoiceEstimateHistoryService } from './invoice-estimate-history.service';
export declare class InvoiceEstimateHistoryController extends CrudController<InvoiceEstimateHistory> {
    private readonly invoiceEstimateHistoryService;
    constructor(invoiceEstimateHistoryService: InvoiceEstimateHistoryService);
    findAll(data: any): Promise<IPagination<IInvoiceEstimateHistory>>;
}

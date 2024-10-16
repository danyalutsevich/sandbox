import { Repository } from 'typeorm';
import { InvoiceEstimateHistory } from '../invoice-estimate-history.entity';
export declare class TypeOrmInvoiceEstimateHistoryRepository extends Repository<InvoiceEstimateHistory> {
    readonly repository: Repository<InvoiceEstimateHistory>;
    constructor(repository: Repository<InvoiceEstimateHistory>);
}

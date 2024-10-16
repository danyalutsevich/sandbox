import { TenantAwareCrudService } from './../core/crud';
import { InvoiceEstimateHistory } from './invoice-estimate-history.entity';
import { TypeOrmInvoiceEstimateHistoryRepository } from './repository/type-orm-invoice-estimate-history.repository';
import { MikroOrmInvoiceEstimateHistoryRepository } from './repository/mikro-orm-invoice-estimate-history.repository';
export declare class InvoiceEstimateHistoryService extends TenantAwareCrudService<InvoiceEstimateHistory> {
    constructor(typeOrmInvoiceEstimateHistoryRepository: TypeOrmInvoiceEstimateHistoryRepository, mikroOrmInvoiceEstimateHistoryRepository: MikroOrmInvoiceEstimateHistoryRepository);
}

import { Repository } from 'typeorm';
import { InvoiceItem } from '../invoice-item.entity';
export declare class TypeOrmInvoiceItemRepository extends Repository<InvoiceItem> {
    readonly repository: Repository<InvoiceItem>;
    constructor(repository: Repository<InvoiceItem>);
}

import { Repository } from 'typeorm';
import { Invoice } from '../invoice.entity';
export declare class TypeOrmInvoiceRepository extends Repository<Invoice> {
    readonly repository: Repository<Invoice>;
    constructor(repository: Repository<Invoice>);
}

import { FindOptionsWhere, UpdateResult } from 'typeorm';
import { IInvoice, IInvoiceUpdateInput } from '../../../plugins/contracts';
import { Invoice } from './../../core/entities/internal';
import { TypeOrmInvoiceRepository } from '../../invoice/repository/type-orm-invoice.repository';
export declare class PublicInvoiceService {
    private typeOrmInvoiceRepository;
    constructor(typeOrmInvoiceRepository: TypeOrmInvoiceRepository);
    /**
     * Find public invoice by token
     *
     * @param params
     * @param relations
     * @returns
     */
    findOneByConditions(params: FindOptionsWhere<Invoice>, relations?: string[]): Promise<IInvoice>;
    /**
     * Update public invoice
     *
     * @param params
     * @param entity
     * @returns
     */
    updateInvoice(params: IInvoice, entity: IInvoiceUpdateInput): Promise<IInvoice | UpdateResult>;
}

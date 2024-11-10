import { IInvoiceItemCreateInput } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { InvoiceItem } from './invoice-item.entity';
import { MikroOrmInvoiceItemRepository } from './repository/mikro-orm-invoice-item.repository';
import { TypeOrmInvoiceItemRepository } from './repository/type-orm-invoice-item.repository';
export declare class InvoiceItemService extends TenantAwareCrudService<InvoiceItem> {
    constructor(typeOrmInvoiceItemRepository: TypeOrmInvoiceItemRepository, mikroOrmInvoiceItemRepository: MikroOrmInvoiceItemRepository);
    /**
     *
     * @param invoiceId
     * @param createInput
     * @returns
     */
    createBulk(invoiceId: string, createInput: IInvoiceItemCreateInput[]): Promise<(IInvoiceItemCreateInput & InvoiceItem)[]>;
}

import { IInvoiceItemCreateInput } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class InvoiceItemBulkCreateCommand implements ICommand {
    readonly invoiceId: string;
    readonly input: IInvoiceItemCreateInput[];
    static readonly type = "[InvoiceItem] Create";
    constructor(invoiceId: string, input: IInvoiceItemCreateInput[]);
}

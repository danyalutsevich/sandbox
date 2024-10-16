import { IInvoice, IInvoiceUpdateInput } from '../../../../plugins/contracts/dist/index';
import { ICommand } from '@nestjs/cqrs';
export declare class PublicInvoiceUpdateCommand implements ICommand {
    readonly params: IInvoice;
    readonly entity: IInvoiceUpdateInput;
    static readonly type = "[Public Invoice] Update";
    constructor(params: IInvoice, entity: IInvoiceUpdateInput);
}

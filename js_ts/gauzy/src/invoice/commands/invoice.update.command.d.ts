import { IInvoiceUpdateInput } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class InvoiceUpdateCommand implements ICommand {
    readonly input: IInvoiceUpdateInput;
    static readonly type = "[Invoice] Update";
    constructor(input: IInvoiceUpdateInput);
}

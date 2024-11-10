import { IInvoiceCreateInput } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class InvoiceCreateCommand implements ICommand {
    readonly input: IInvoiceCreateInput;
    static readonly type = "[Invoice] Create";
    constructor(input: IInvoiceCreateInput);
}

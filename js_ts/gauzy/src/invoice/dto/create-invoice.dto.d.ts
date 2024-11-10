import { IInvoiceCreateInput, InvoiceTypeEnum, IOrganization } from '../../../plugins/contracts';
import { RelationalTagDTO } from "./../../tags/dto";
import { DiscountInvoiceDTO } from "./discount-invoice.dto";
import { InvoiceDTO } from "./invoice.dto";
import { TaxInvoiceDTO } from "./tax-invoice.dto";
declare const CreateInvoiceDTO_base: import("@nestjs/mapped-types").MappedType<RelationalTagDTO & DiscountInvoiceDTO & InvoiceDTO & TaxInvoiceDTO>;
export declare class CreateInvoiceDTO extends CreateInvoiceDTO_base implements IInvoiceCreateInput {
    readonly fromOrganization: IOrganization;
    readonly fromOrganizationId: string;
    readonly sentTo: string;
    readonly invoiceType: InvoiceTypeEnum;
}
export {};

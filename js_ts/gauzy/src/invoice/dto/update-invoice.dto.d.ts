import { IInvoiceUpdateInput } from '../../../plugins/contracts';
import { RelationalTagDTO } from "./../../tags/dto";
import { DiscountInvoiceDTO } from "./discount-invoice.dto";
import { InvoiceDTO } from "./invoice.dto";
import { TaxInvoiceDTO } from "./tax-invoice.dto";
declare const UpdateInvoiceDTO_base: import("@nestjs/mapped-types").MappedType<RelationalTagDTO & DiscountInvoiceDTO & InvoiceDTO & TaxInvoiceDTO>;
export declare class UpdateInvoiceDTO extends UpdateInvoiceDTO_base implements IInvoiceUpdateInput {
}
export {};

import { DiscountTaxTypeEnum } from '../../../plugins/contracts';
export declare class TaxInvoiceDTO {
    taxType: DiscountTaxTypeEnum;
    tax2Type: DiscountTaxTypeEnum;
    readonly tax: number;
    readonly tax2: number;
}

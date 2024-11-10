import { InvoiceStatusEnumType } from '../../../plugins/contracts';
export declare class UpdateInvoiceActionDTO {
    readonly status: InvoiceStatusEnumType;
    readonly isEstimate: boolean;
    readonly internalNote: string;
    readonly isArchived: boolean;
    readonly paid: boolean;
    readonly alreadyPaid: number;
    readonly amountDue: number;
}

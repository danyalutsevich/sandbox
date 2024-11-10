import { CurrenciesEnum, IInvoiceEstimateHistory, InvoiceStatusEnumType, IOrganizationContact, IPayment } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "./../../core/dto";
import { CreateInvoiceItemDTO } from "./../../invoice-item/dto";
export declare class InvoiceDTO extends TenantOrganizationBaseDTO {
    readonly invoiceNumber: number;
    readonly invoiceDate: Date;
    readonly dueDate: Date;
    readonly status: InvoiceStatusEnumType;
    readonly totalValue: number;
    readonly currency: CurrenciesEnum;
    readonly paid: boolean;
    readonly terms: string;
    readonly organizationContactId: string;
    readonly organizationContactName: string;
    readonly isEstimate: boolean;
    readonly isAccepted: boolean;
    readonly internalNote: string;
    readonly alreadyPaid: number;
    readonly amountDue: number;
    readonly hasRemainingAmountInvoiced: boolean;
    readonly isArchived: boolean;
    readonly toContact: IOrganizationContact;
    readonly toContactId: string;
    readonly invoiceItems: CreateInvoiceItemDTO[];
    readonly payments: IPayment[];
    readonly historyRecords: IInvoiceEstimateHistory[];
}

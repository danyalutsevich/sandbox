import { IInvoice, IUser } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "core/dto";
export declare abstract class InvoiceEstimateHistoryDTO extends TenantOrganizationBaseDTO {
    readonly action: string;
    readonly title: string;
    readonly user: IUser;
    readonly userId: string;
    readonly invoice: IInvoice;
    readonly invoiceId: string;
}

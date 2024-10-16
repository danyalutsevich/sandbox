import { IInvoice, IOrganizationContact, IOrganizationProject, PaymentMethodEnum } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "./../../core/dto";
export declare class PaymentDTO extends TenantOrganizationBaseDTO {
    readonly paymentDate: Date;
    readonly amount: number;
    readonly overdue: boolean;
    readonly note: string;
    readonly paymentMethod: PaymentMethodEnum;
    readonly invoice: IInvoice;
    readonly invoiceId: string;
    readonly project: IOrganizationProject;
    readonly projectId: string;
    readonly organizationContact: IOrganizationContact;
    readonly organizationContactId: string;
}

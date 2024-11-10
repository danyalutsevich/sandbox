import { IPayment, PaymentMethodEnum, IEmployee, IInvoice, ITag, IOrganizationContact, IOrganizationProject, IUser } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class Payment extends TenantOrganizationBaseEntity implements IPayment {
    paymentDate?: Date;
    amount?: number;
    note?: string;
    currency?: string;
    paymentMethod?: PaymentMethodEnum;
    overdue?: boolean;
    /**
     * Employee
     */
    employeeId?: string;
    employee?: IEmployee;
    /**
     * Invoice
     */
    invoiceId?: string;
    invoice?: IInvoice;
    /**
     * User
     */
    recordedBy?: IUser;
    recordedById?: IUser['id'];
    /**
     * Organization Project Relationship
     */
    project?: IOrganizationProject;
    /**
     * Organization Project ID
     */
    projectId?: IOrganizationProject['id'];
    /**
     * OrganizationContact
     */
    organizationContact?: IOrganizationContact;
    organizationContactId?: string;
    tags?: ITag[];
}

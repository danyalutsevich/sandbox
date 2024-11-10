import { IOrganizationContact, ContactOrganizationInviteStatus, ContactType, ITag, IContact, IOrganizationProject, IInvoice, IEmployee, IPayment, OrganizationContactBudgetTypeEnum, IExpense, ITimeLog, IIncome, IImageAsset } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class OrganizationContact extends TenantOrganizationBaseEntity implements IOrganizationContact {
    name: string;
    primaryEmail: string;
    primaryPhone: string;
    inviteStatus?: ContactOrganizationInviteStatus;
    notes?: string;
    contactType: ContactType;
    imageUrl?: string;
    budget?: number;
    budgetType?: OrganizationContactBudgetTypeEnum;
    createdBy?: string;
    /**
     * Contact
     */
    contact?: IContact;
    contactId?: IContact['id'];
    /**
     * ImageAsset
     */
    image?: IImageAsset;
    imageId?: IImageAsset['id'];
    /**
     * Organization Projects Relationship
     */
    projects?: IOrganizationProject[];
    invoices?: IInvoice[];
    payments?: IPayment[];
    /**
     * Expense
     */
    expenses?: IExpense[];
    /**
     * Income
     */
    incomes?: IIncome[];
    /**
     * TimeLog
     */
    timeLogs?: ITimeLog[];
    tags: ITag[];
    members?: IEmployee[];
}

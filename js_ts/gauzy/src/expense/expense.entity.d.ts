import { IExpense, IOrganizationVendor, IExpenseCategory, ITag, IEmployee, IOrganizationProject, IOrganizationContact, ExpenseStatusesEnum } from '../../plugins/contracts/dist/index';
import { InvoiceItem, TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class Expense extends TenantOrganizationBaseEntity implements IExpense {
    amount: number;
    typeOfExpense: string;
    notes?: string;
    currency: string;
    valueDate?: Date;
    purpose?: string;
    taxType?: string;
    taxLabel?: string;
    rateValue: number;
    receipt?: string;
    splitExpense: boolean;
    reference?: string;
    status?: ExpenseStatusesEnum;
    /**
     * Employee
     */
    employee?: IEmployee;
    employeeId?: string;
    /**
     * OrganizationVendor
     */
    vendor: IOrganizationVendor;
    vendorId: string;
    /**
     * ExpenseCategory
     */
    category: IExpenseCategory;
    categoryId: string;
    /**
     * Organization Project Relationship
     */
    project?: IOrganizationProject;
    /**
     * Organization Project ID
     */
    projectId?: string;
    /**
     * OrganizationContact
     */
    organizationContact?: IOrganizationContact;
    organizationContactId?: string;
    /**
     * InvoiceItem
     */
    invoiceItems?: InvoiceItem[];
    /**
     * Tag
     */
    tags?: ITag[];
}

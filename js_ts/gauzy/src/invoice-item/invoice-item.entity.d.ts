import { IEmployee, IExpense, IInvoice, IInvoiceItem, IOrganizationProject, IProductTranslatable, ITask } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class InvoiceItem extends TenantOrganizationBaseEntity implements IInvoiceItem {
    description: string;
    price: number;
    quantity: number;
    totalValue: number;
    applyTax?: boolean;
    applyDiscount?: boolean;
    expense?: IExpense;
    expenseId?: string;
    invoice?: IInvoice;
    invoiceId?: string;
    task?: ITask;
    taskId?: string;
    employee?: IEmployee;
    employeeId?: string;
    project?: IOrganizationProject;
    projectId?: IOrganizationProject['id'];
    product?: IProductTranslatable;
    productId?: string;
}

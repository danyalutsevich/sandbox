import { ExpenseStatusesEnum, IExpenseCategory, IOrganizationContact, IOrganizationProject } from "../../../plugins/contracts";
import { TenantOrganizationBaseDTO } from "./../../core/dto";
export declare class ExpenseDTO extends TenantOrganizationBaseDTO {
    readonly amount: number;
    readonly valueDate: Date;
    readonly notes: string;
    readonly reference: string;
    readonly typeOfExpense: string;
    readonly purpose: string;
    readonly taxType: string;
    readonly taxLabel: string;
    readonly rateValue: number;
    readonly receipt: string;
    readonly splitExpense: boolean;
    readonly status: ExpenseStatusesEnum;
    readonly project: IOrganizationProject;
    readonly projectId?: string;
    readonly organizationContactId: string;
    readonly organizationContact: IOrganizationContact;
    readonly category: IExpenseCategory;
    readonly categoryId: IExpenseCategory['id'];
}

import { IExpense, IExpenseCategory, ITag } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class ExpenseCategory extends TenantOrganizationBaseEntity implements IExpenseCategory {
    name: string;
    /**
     * Expense
     */
    expenses?: IExpense[];
    /**
     * Tag
     */
    tags?: ITag[];
}

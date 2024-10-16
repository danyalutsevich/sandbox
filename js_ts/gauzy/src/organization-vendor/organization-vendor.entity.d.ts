import { IExpense, IOrganizationVendor, ITag } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class OrganizationVendor extends TenantOrganizationBaseEntity implements IOrganizationVendor {
    name: string;
    email?: string;
    phone?: string;
    website?: string;
    /**
     * Expense
     */
    expenses?: IExpense[];
    /**
     * Tag
     */
    tags?: ITag[];
}

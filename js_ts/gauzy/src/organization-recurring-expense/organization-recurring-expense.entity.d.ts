import { IOrganizationRecurringExpense } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class OrganizationRecurringExpense extends TenantOrganizationBaseEntity implements IOrganizationRecurringExpense {
    startDay: number;
    startMonth: number;
    startYear: number;
    startDate: Date;
    endDay: number;
    endMonth: number;
    endYear: number;
    endDate?: Date;
    categoryName: string;
    value: number;
    currency: string;
    splitExpense: boolean;
    parentRecurringExpenseId?: string;
}

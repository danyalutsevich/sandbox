import { IEmployee, IEmployeeRecurringExpense } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class EmployeeRecurringExpense extends TenantOrganizationBaseEntity implements IEmployeeRecurringExpense {
    startDay: number;
    startMonth: number;
    startYear: number;
    startDate: Date;
    endDay?: number;
    endMonth?: number;
    endYear?: number;
    endDate?: Date;
    categoryName: string;
    value: number;
    currency: string;
    parentRecurringExpenseId?: string;
    employee?: IEmployee;
    employeeId: string;
}

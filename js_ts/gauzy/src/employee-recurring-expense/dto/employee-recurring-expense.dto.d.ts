import { TenantOrganizationBaseDTO } from "./../../core/dto";
export declare class EmployeeRecurringExpenseDTO extends TenantOrganizationBaseDTO {
    readonly value: number;
    readonly categoryName: string;
    readonly startDay: number;
    readonly startMonth: number;
    readonly startYear: number;
    readonly startDate: Date;
    readonly endDay: number;
    readonly endMonth: number;
    readonly endYear: number;
    readonly endDate: Date;
    readonly parentRecurringExpenseId: string;
}

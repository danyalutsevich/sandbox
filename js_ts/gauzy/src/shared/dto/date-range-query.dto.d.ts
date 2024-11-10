import { IDateRangePicker } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "./../../core/dto";
declare const DateRangeQueryDTO_base: import("@nestjs/common").Type<Omit<TenantOrganizationBaseDTO, "sentTo">>;
/**
 * Get date range common request DTO validation
 */
export declare class DateRangeQueryDTO extends DateRangeQueryDTO_base implements IDateRangePicker {
    readonly startDate: Date;
    readonly endDate: Date;
}
export {};

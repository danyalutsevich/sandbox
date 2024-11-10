import { ITimerStatusInput } from '../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from './../../../core/dto';
import { RelationsQueryDTO, SelectorsQueryDTO } from './../../../shared/dto';
import { StartTimerDTO } from './start-timer.dto';
import { TodayDateRangeQueryDTO } from './../../statistic/dto';
import { EmployeeFeatureDTO } from './../../../employee/dto';
declare const TimerStatusQueryDTO_base: import("@nestjs/common").Type<TenantOrganizationBaseDTO & RelationsQueryDTO & SelectorsQueryDTO & TodayDateRangeQueryDTO & Partial<Pick<EmployeeFeatureDTO, "employeeId">> & Partial<Pick<StartTimerDTO, "source">>>;
/**
 * Comprehensive DTO for querying timer status, combining various other DTOs.
 */
export declare class TimerStatusQueryDTO extends TimerStatusQueryDTO_base implements ITimerStatusInput {
}
export {};

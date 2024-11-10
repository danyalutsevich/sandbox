import { ITimeLogFilters, ITimeLogTodayFilters } from '../../../../plugins/contracts/dist/index';
import { FiltersQueryDTO, SelectorsQueryDTO } from "../../../shared/dto";
import { TodayDateRangeQueryDTO } from "./today-date-range-query.dto";
declare const TimeTrackingStatisticQueryDTO_base: import("@nestjs/common").Type<FiltersQueryDTO & SelectorsQueryDTO & TodayDateRangeQueryDTO>;
/**
 * Get statistic counts request DTO validation
 */
export declare class TimeTrackingStatisticQueryDTO extends TimeTrackingStatisticQueryDTO_base implements ITimeLogFilters, ITimeLogTodayFilters {
    readonly defaultRange: boolean;
    readonly unitOfTime: moment.unitOfTime.Base;
    /**
     * Limit - max number of entities should be taken.
     */
    readonly take: number;
}
export {};

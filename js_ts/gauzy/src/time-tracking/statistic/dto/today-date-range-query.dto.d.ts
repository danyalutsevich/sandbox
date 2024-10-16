import { ITimeLogTodayFilters } from '../../../../plugins/contracts/dist/index';
export declare class TodayDateRangeQueryDTO implements ITimeLogTodayFilters {
    /**
     * The start of the date range for today's logs.
     */
    readonly todayStart: Date;
    /**
     * The end of the date range for today's logs.
     */
    readonly todayEnd: Date;
}

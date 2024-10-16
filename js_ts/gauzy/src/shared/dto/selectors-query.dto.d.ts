import { ITimeLogFilters } from '../../../plugins/contracts';
import { DateRangeQueryDTO } from './date-range-query.dto';
/**
 * Get selectors common request DTO validation.
 * Extends DateRangeQueryDTO to include date range filters.
 */
export declare class SelectorsQueryDTO extends DateRangeQueryDTO implements ITimeLogFilters {
    /**
     * An array of employee IDs for filtering time logs.
     */
    readonly employeeIds: string[];
    /**
     * An array of project IDs for filtering time logs.
     */
    readonly projectIds: string[];
    /**
     * An array of task IDs for filtering time logs.
     */
    readonly taskIds: string[];
    /**
     * An array of team IDs for filtering time logs.
     */
    readonly teamIds: string[];
}

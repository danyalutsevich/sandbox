import { ITimeLogFilters, TimeLogSourceEnum, TimeLogType } from '../../../plugins/contracts';
/**
 * Get filters common request DTO validation
 */
export declare class FiltersQueryDTO implements ITimeLogFilters {
    readonly source: TimeLogSourceEnum[];
    readonly logType: TimeLogType[];
    readonly activityLevel: {
        start: number;
        end: number;
    };
}

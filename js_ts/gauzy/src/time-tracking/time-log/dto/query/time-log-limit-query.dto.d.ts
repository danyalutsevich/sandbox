import { IGetTimeLogReportInput } from '../../../../../plugins/contracts/dist/index';
import { TimeLogQueryDTO } from "./time-log-query.dto";
declare const TimeLogLimitQueryDTO_base: import("@nestjs/common").Type<Omit<TimeLogQueryDTO, "timesheetId">>;
/**
 * Get time log daily/weekly limit request DTO validation
 */
export declare class TimeLogLimitQueryDTO extends TimeLogLimitQueryDTO_base implements IGetTimeLogReportInput {
    readonly duration: 'day' | 'week' | 'month';
}
export {};

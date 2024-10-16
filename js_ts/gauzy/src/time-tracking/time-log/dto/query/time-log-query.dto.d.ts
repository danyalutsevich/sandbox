import { IGetTimeLogReportInput, ITimesheet, ReportGroupFilterEnum } from '../../../../../plugins/contracts/dist/index';
import { FiltersQueryDTO, RelationsQueryDTO, SelectorsQueryDTO } from '../../../../shared/dto';
declare const TimeLogQueryDTO_base: import("@nestjs/common").Type<FiltersQueryDTO & RelationsQueryDTO & SelectorsQueryDTO>;
/**
 * Get time log request DTO validation
 */
export declare class TimeLogQueryDTO extends TimeLogQueryDTO_base implements IGetTimeLogReportInput {
    readonly groupBy: ReportGroupFilterEnum;
    readonly timesheetId: ITimesheet['id'];
    readonly timeZone: string;
    readonly isEdited: boolean;
}
export {};

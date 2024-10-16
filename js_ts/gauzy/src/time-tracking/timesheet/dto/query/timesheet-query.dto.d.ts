import { IGetTimesheetInput } from '../../../../../plugins/contracts/dist/index';
import { RelationsQueryDTO, SelectorsQueryDTO } from "./../../../../shared/dto";
declare const TimesheetQueryDTO_base: import("@nestjs/common").Type<RelationsQueryDTO & SelectorsQueryDTO>;
/**
 * Get timesheet request DTO validation
 */
export declare class TimesheetQueryDTO extends TimesheetQueryDTO_base implements IGetTimesheetInput {
}
export {};

import { IGetTimesheetInput } from '../../../../../plugins/contracts/dist/index';
import { IntersectionType } from "@nestjs/swagger";
import { RelationsQueryDTO, SelectorsQueryDTO } from "./../../../../shared/dto";

/**
 * Get timesheet request DTO validation
 */
export class TimesheetQueryDTO extends IntersectionType(
    RelationsQueryDTO,
    SelectorsQueryDTO
) implements IGetTimesheetInput {}
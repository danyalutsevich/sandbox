import { IGetTimeSlotInput } from '../../../../../plugins/contracts/dist/index';
import { FiltersQueryDTO, RelationsQueryDTO, SelectorsQueryDTO } from "./../../../../shared/dto";
declare const TimeSlotQueryDTO_base: import("@nestjs/common").Type<FiltersQueryDTO & RelationsQueryDTO & SelectorsQueryDTO>;
/**
 * Get time slot request DTO validation
 */
export declare class TimeSlotQueryDTO extends TimeSlotQueryDTO_base implements IGetTimeSlotInput {
}
export {};

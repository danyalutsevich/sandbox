import { IntersectionType } from "@nestjs/swagger";
import { IGetTimeSlotInput } from '../../../../../plugins/contracts/dist/index';;
import { FiltersQueryDTO, RelationsQueryDTO, SelectorsQueryDTO } from "./../../../../shared/dto";

/**
 * Get time slot request DTO validation
 */
export class TimeSlotQueryDTO extends IntersectionType(
    FiltersQueryDTO,
    IntersectionType(RelationsQueryDTO, SelectorsQueryDTO)
) implements IGetTimeSlotInput {}
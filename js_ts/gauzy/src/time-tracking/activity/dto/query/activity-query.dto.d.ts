import { IGetActivitiesInput, ReportGroupFilterEnum } from '../../../../../plugins/contracts/dist/index';
import { FiltersQueryDTO, SelectorsQueryDTO } from "../../../../shared/dto";
declare const ActivityQueryDTO_base: import("@nestjs/common").Type<SelectorsQueryDTO & FiltersQueryDTO>;
/**
 * Get activities request DTO validation
 */
export declare class ActivityQueryDTO extends ActivityQueryDTO_base implements IGetActivitiesInput {
    readonly groupBy: ReportGroupFilterEnum;
    readonly types: string[];
    readonly titles: string[];
}
export {};

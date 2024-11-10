import { IDateRangePicker, IOrganizationTeamStatisticInput } from '../../../plugins/contracts';
import { DateRangeQueryDTO, RelationsQueryDTO } from './../../shared/dto';
declare const OrganizationTeamStatisticDTO_base: import("@nestjs/common").Type<DateRangeQueryDTO & RelationsQueryDTO>;
/**
 * DTO for handling requests related to organization team statistics.
 * Combines date range and relations query features.
 */
export declare class OrganizationTeamStatisticDTO extends OrganizationTeamStatisticDTO_base implements IOrganizationTeamStatisticInput, IDateRangePicker {
    /**
     * Indicates whether the last worked task row should be included in the entity result.
     * Default value is set to false.
     */
    readonly withLastWorkedTask: boolean;
}
export {};

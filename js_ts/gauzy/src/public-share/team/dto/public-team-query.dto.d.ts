import { IDateRangePicker, IOrganizationTeamStatisticInput } from '../../../../plugins/contracts/dist/index';
import { DateRangeQueryDTO } from './../../../shared/dto';
import { OrganizationTeamStatisticDTO } from './../../../organization-team/dto';
import { TimerStatusQueryDTO } from './../../../time-tracking/timer/dto';
/**
 * Get public employee request DTO validation
 */
export declare enum PublicTeamRelationEnum {
    'organization' = "organization",
    'members' = "members",
    'members.employee' = "members.employee",
    'members.employee.user' = "members.employee.user",
    'tasks' = "tasks",
    'tasks.members' = "tasks.members",
    'tasks.teams' = "tasks.teams",
    'tasks.tags' = "tasks.tags",
    'statuses' = "statuses",
    'priorities' = "priorities",
    'sizes' = "sizes",
    'labels' = "labels",
    'issueTypes' = "issueTypes"
}
declare const PublicTeamQueryDTO_base: import("@nestjs/common").Type<Pick<OrganizationTeamStatisticDTO, "withLastWorkedTask"> & Pick<DateRangeQueryDTO, "startDate" | "endDate"> & Pick<Partial<TimerStatusQueryDTO>, "source">>;
export declare class PublicTeamQueryDTO extends PublicTeamQueryDTO_base implements IDateRangePicker, IOrganizationTeamStatisticInput {
    readonly relations: string[];
}
export {};

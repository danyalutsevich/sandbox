import { IQuery } from '@nestjs/cqrs';
import { IDateRangePicker, IOrganizationTeam, IOrganizationTeamStatisticInput } from '../../../plugins/contracts';
export declare class GetOrganizationTeamStatisticQuery implements IQuery {
    readonly organizationTeamId: IOrganizationTeam['id'];
    readonly query: IOrganizationTeamStatisticInput & IDateRangePicker;
    static readonly type = "Get [Organization Team] Statistic";
    constructor(organizationTeamId: IOrganizationTeam['id'], query: IOrganizationTeamStatisticInput & IDateRangePicker);
}

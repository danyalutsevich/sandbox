import { IQueryHandler } from '@nestjs/cqrs';
import { IOrganizationTeam } from '../../../../plugins/contracts/dist/index';
import { GetOrganizationTeamStatisticQuery } from '../get-organization-team-statistic.query';
import { OrganizationTeamService } from '../../organization-team.service';
export declare class GetOrganizationTeamStatisticHandler implements IQueryHandler<GetOrganizationTeamStatisticQuery> {
    private readonly _organizationTeamService;
    constructor(_organizationTeamService: OrganizationTeamService);
    /**
    * Executes the given query to get organization team statistics.
    *
    * @param input - The query input containing parameters to fetch the team statistics.
    * @returns A promise resolving to an object representing the organization team statistics.
    * @throws SomeException - If an error occurs during execution.
    */
    execute(input: GetOrganizationTeamStatisticQuery): Promise<IOrganizationTeam>;
}

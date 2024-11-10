import { IQueryHandler } from '@nestjs/cqrs';
import { IOrganizationTeam } from '../../../../../plugins/contracts/dist/index';
import { FindPublicTeamQuery } from '../find-public-team.query';
import { PublicTeamService } from './../../public-team.service';
export declare class FindPublicTeamHandler implements IQueryHandler<FindPublicTeamQuery, IOrganizationTeam> {
    private readonly _publicTeamService;
    constructor(_publicTeamService: PublicTeamService);
    /**
     * Executes a query to find a public team by a given profile link.
     * @param query - An object containing the parameters and optional query options.
     * @returns A promise that resolves to an `IOrganizationTeam`.
     */
    execute(query: FindPublicTeamQuery): Promise<IOrganizationTeam>;
}

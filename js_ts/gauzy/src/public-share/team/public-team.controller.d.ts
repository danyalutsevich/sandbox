import { QueryBus } from '@nestjs/cqrs';
import { FindOptionsWhere } from 'typeorm';
import { IOrganizationTeam } from '../../../plugins/contracts';
import { OrganizationTeam } from './../../core/entities/internal';
import { PublicTeamQueryDTO } from './dto';
export declare class PublicTeamController {
    private readonly _queryBus;
    constructor(_queryBus: QueryBus);
    /**
     * GET team by profile link
     *
     * @param params
     * @param options
     * @returns
     */
    findOneByProfileLink(params: FindOptionsWhere<OrganizationTeam>, options: PublicTeamQueryDTO): Promise<IOrganizationTeam>;
}

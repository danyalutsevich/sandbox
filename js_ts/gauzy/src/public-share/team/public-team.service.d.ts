import { FindOptionsWhere } from 'typeorm';
import { IDateRangePicker, IOrganizationTeam, IOrganizationTeamEmployee, IOrganizationTeamStatisticInput } from '../../../plugins/contracts';
import { OrganizationTeam } from './../../core/entities/internal';
import { StatisticService } from './../../time-tracking/statistic';
import { TimerService } from './../../time-tracking/timer/timer.service';
import { TypeOrmOrganizationTeamRepository } from '../../organization-team/repository';
export declare class PublicTeamService {
    protected readonly typeOrmOrganizationTeamRepository: TypeOrmOrganizationTeamRepository;
    protected readonly statisticService: StatisticService;
    protected readonly timerService: TimerService;
    constructor(typeOrmOrganizationTeamRepository: TypeOrmOrganizationTeamRepository, statisticService: StatisticService, timerService: TimerService);
    /**
     * Find a public organization team by profile link with the specified options.
     *
     * @param params - Conditions for finding the team
     * @param options - Additional query options like date range or related entities
     * @returns The found organization team
     */
    findOneByProfileLink(params: FindOptionsWhere<OrganizationTeam>, options: IDateRangePicker & IOrganizationTeamStatisticInput): Promise<IOrganizationTeam>;
    /**
     * Syncs team members' data with worked tasks and timer status.
     *
     * @param organizationTeam - The team to which members belong
     * @param members - Members of the team
     * @param options - Additional options like date range and task source
     * @returns A promise resolving to an array of updated team members
     */
    syncMembers(organizationTeam: IOrganizationTeam, members: IOrganizationTeamEmployee[], options: IDateRangePicker & IOrganizationTeamStatisticInput): Promise<IOrganizationTeamEmployee[]>;
}

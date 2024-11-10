import { Repository } from 'typeorm';
import { OrganizationTeam } from '../organization-team.entity';
export declare class TypeOrmOrganizationTeamRepository extends Repository<OrganizationTeam> {
    readonly repository: Repository<OrganizationTeam>;
    constructor(repository: Repository<OrganizationTeam>);
}

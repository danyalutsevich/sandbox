import { Repository } from 'typeorm';
import { OrganizationTeamJoinRequest } from '../organization-team-join-request.entity';
export declare class TypeOrmOrganizationTeamJoinRequestRepository extends Repository<OrganizationTeamJoinRequest> {
    readonly repository: Repository<OrganizationTeamJoinRequest>;
    constructor(repository: Repository<OrganizationTeamJoinRequest>);
}

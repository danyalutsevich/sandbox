import { Repository } from 'typeorm';
import { OrganizationTeamEmployee } from '../organization-team-employee.entity';
export declare class TypeOrmOrganizationTeamEmployeeRepository extends Repository<OrganizationTeamEmployee> {
    readonly repository: Repository<OrganizationTeamEmployee>;
    constructor(repository: Repository<OrganizationTeamEmployee>);
}

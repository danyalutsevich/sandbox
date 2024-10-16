import { Repository } from 'typeorm';
import { OrganizationSprint } from '../organization-sprint.entity';
export declare class TypeOrmOrganizationSprintRepository extends Repository<OrganizationSprint> {
    readonly repository: Repository<OrganizationSprint>;
    constructor(repository: Repository<OrganizationSprint>);
}

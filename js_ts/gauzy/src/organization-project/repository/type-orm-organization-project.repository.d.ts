import { Repository } from 'typeorm';
import { OrganizationProject } from '../organization-project.entity';
export declare class TypeOrmOrganizationProjectRepository extends Repository<OrganizationProject> {
    readonly repository: Repository<OrganizationProject>;
    constructor(repository: Repository<OrganizationProject>);
}

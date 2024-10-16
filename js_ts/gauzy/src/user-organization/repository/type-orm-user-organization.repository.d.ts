import { Repository } from 'typeorm';
import { UserOrganization } from '../user-organization.entity';
export declare class TypeOrmUserOrganizationRepository extends Repository<UserOrganization> {
    readonly repository: Repository<UserOrganization>;
    constructor(repository: Repository<UserOrganization>);
}

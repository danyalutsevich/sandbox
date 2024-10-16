import { Repository } from 'typeorm';
import { Organization } from '../organization.entity';
export declare class TypeOrmOrganizationRepository extends Repository<Organization> {
    readonly repository: Repository<Organization>;
    constructor(repository: Repository<Organization>);
}

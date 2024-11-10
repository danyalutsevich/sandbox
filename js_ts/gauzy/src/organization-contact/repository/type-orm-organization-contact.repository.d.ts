import { Repository } from 'typeorm';
import { OrganizationContact } from '../organization-contact.entity';
export declare class TypeOrmOrganizationContactRepository extends Repository<OrganizationContact> {
    readonly repository: Repository<OrganizationContact>;
    constructor(repository: Repository<OrganizationContact>);
}

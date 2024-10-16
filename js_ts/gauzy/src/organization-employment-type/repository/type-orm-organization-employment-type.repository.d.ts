import { Repository } from 'typeorm';
import { OrganizationEmploymentType } from '../organization-employment-type.entity';
export declare class TypeOrmOrganizationEmploymentTypeRepository extends Repository<OrganizationEmploymentType> {
    readonly repository: Repository<OrganizationEmploymentType>;
    constructor(repository: Repository<OrganizationEmploymentType>);
}

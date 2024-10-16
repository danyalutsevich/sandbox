import { TenantAwareCrudService } from './../core/crud';
import { OrganizationEmploymentType } from './organization-employment-type.entity';
import { TypeOrmOrganizationEmploymentTypeRepository } from './repository/type-orm-organization-employment-type.repository';
import { MikroOrmOrganizationEmploymentTypeRepository } from './repository/mikro-orm-organization-employment-type.repository';
export declare class OrganizationEmploymentTypeService extends TenantAwareCrudService<OrganizationEmploymentType> {
    constructor(typeOrmOrganizationEmploymentTypeRepository: TypeOrmOrganizationEmploymentTypeRepository, mikroOrmOrganizationEmploymentTypeRepository: MikroOrmOrganizationEmploymentTypeRepository);
}

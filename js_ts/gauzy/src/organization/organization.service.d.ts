import { TenantAwareCrudService } from './../core/crud';
import { Organization } from './organization.entity';
import { TypeOrmOrganizationRepository, MikroOrmOrganizationRepository } from './repository';
export declare class OrganizationService extends TenantAwareCrudService<Organization> {
    readonly typeOrmOrganizationRepository: TypeOrmOrganizationRepository;
    readonly mikroOrmOrganizationRepository: MikroOrmOrganizationRepository;
    constructor(typeOrmOrganizationRepository: TypeOrmOrganizationRepository, mikroOrmOrganizationRepository: MikroOrmOrganizationRepository);
}

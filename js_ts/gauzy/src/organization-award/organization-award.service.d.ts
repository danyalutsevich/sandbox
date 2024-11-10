import { TenantAwareCrudService } from './../core/crud';
import { OrganizationAward } from './organization-award.entity';
import { MikroOrmOrganizationAwardRepository } from './repository/mikro-orm-organization-award.repository';
import { TypeOrmOrganizationAwardRepository } from './repository/type-orm-organization-award.repository';
export declare class OrganizationAwardService extends TenantAwareCrudService<OrganizationAward> {
    constructor(typeOrmOrganizationAwardRepository: TypeOrmOrganizationAwardRepository, mikroOrmOrganizationAwardRepository: MikroOrmOrganizationAwardRepository);
}

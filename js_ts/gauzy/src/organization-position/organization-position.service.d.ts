import { TenantAwareCrudService } from './../core/crud';
import { OrganizationPosition } from './organization-position.entity';
import { TypeOrmOrganizationPositionRepository } from './repository/type-orm-organization-position.repository';
import { MikroOrmOrganizationPositionRepository } from './repository/mikro-orm-organization-position.repository';
export declare class OrganizationPositionService extends TenantAwareCrudService<OrganizationPosition> {
    constructor(typeOrmOrganizationPositionRepository: TypeOrmOrganizationPositionRepository, mikroOrmOrganizationPositionRepository: MikroOrmOrganizationPositionRepository);
}

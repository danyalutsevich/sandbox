import { OrganizationSprint } from './organization-sprint.entity';
import { TenantAwareCrudService } from './../core/crud';
import { TypeOrmOrganizationSprintRepository } from './repository/type-orm-organization-sprint.repository';
import { MikroOrmOrganizationSprintRepository } from './repository/mikro-orm-organization-sprint.repository';
export declare class OrganizationSprintService extends TenantAwareCrudService<OrganizationSprint> {
    constructor(typeOrmOrganizationSprintRepository: TypeOrmOrganizationSprintRepository, mikroOrmOrganizationSprintRepository: MikroOrmOrganizationSprintRepository);
}

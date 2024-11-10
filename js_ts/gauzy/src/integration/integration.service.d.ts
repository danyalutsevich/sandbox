import { CrudService } from '../core/crud';
import { Integration } from './integration.entity';
import { TypeOrmIntegrationRepository } from './repository/type-orm-integration.repository';
import { MikroOrmIntegrationRepository } from './repository/mikro-orm-integration.repository';
export declare class IntegrationService extends CrudService<Integration> {
    constructor(typeOrmIntegrationRepository: TypeOrmIntegrationRepository, mikroOrmIntegrationRepository: MikroOrmIntegrationRepository);
}

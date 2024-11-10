import { Repository } from 'typeorm';
import { IntegrationTenant } from '../integration-tenant.entity';
export declare class TypeOrmIntegrationTenantRepository extends Repository<IntegrationTenant> {
    readonly repository: Repository<IntegrationTenant>;
    constructor(repository: Repository<IntegrationTenant>);
}

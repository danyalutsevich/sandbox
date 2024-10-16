import { Repository } from 'typeorm';
import { Tenant } from '../tenant.entity';
export declare class TypeOrmTenantRepository extends Repository<Tenant> {
    readonly repository: Repository<Tenant>;
    constructor(repository: Repository<Tenant>);
}

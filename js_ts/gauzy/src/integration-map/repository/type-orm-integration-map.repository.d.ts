import { Repository } from 'typeorm';
import { IntegrationMap } from '../integration-map.entity';
export declare class TypeOrmIntegrationMapRepository extends Repository<IntegrationMap> {
    readonly repository: Repository<IntegrationMap>;
    constructor(repository: Repository<IntegrationMap>);
}

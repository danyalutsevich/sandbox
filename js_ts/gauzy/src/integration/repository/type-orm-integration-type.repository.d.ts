import { Repository } from 'typeorm';
import { IntegrationType } from '../integration-type.entity';
export declare class TypeOrmIntegrationTypeRepository extends Repository<IntegrationType> {
    readonly repository: Repository<IntegrationType>;
    constructor(repository: Repository<IntegrationType>);
}

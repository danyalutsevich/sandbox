import { Repository } from 'typeorm';
import { Integration } from '../integration.entity';
export declare class TypeOrmIntegrationRepository extends Repository<Integration> {
    readonly repository: Repository<Integration>;
    constructor(repository: Repository<Integration>);
}

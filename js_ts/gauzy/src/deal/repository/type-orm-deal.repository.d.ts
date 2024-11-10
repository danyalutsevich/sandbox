import { Repository } from 'typeorm';
import { Deal } from '../deal.entity';
export declare class TypeOrmDealRepository extends Repository<Deal> {
    readonly repository: Repository<Deal>;
    constructor(repository: Repository<Deal>);
}

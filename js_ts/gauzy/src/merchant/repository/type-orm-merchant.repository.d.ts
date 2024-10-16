import { Repository } from 'typeorm';
import { Merchant } from '../merchant.entity';
export declare class TypeOrmMerchantRepository extends Repository<Merchant> {
    readonly repository: Repository<Merchant>;
    constructor(repository: Repository<Merchant>);
}

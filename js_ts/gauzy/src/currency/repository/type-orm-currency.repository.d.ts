import { Repository } from 'typeorm';
import { Currency } from '../currency.entity';
export declare class TypeOrmCurrencyRepository extends Repository<Currency> {
    readonly repository: Repository<Currency>;
    constructor(repository: Repository<Currency>);
}

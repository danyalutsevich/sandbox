import { Repository } from 'typeorm';
import { Country } from '../country.entity';
export declare class TypeOrmCountryRepository extends Repository<Country> {
    readonly repository: Repository<Country>;
    constructor(repository: Repository<Country>);
}

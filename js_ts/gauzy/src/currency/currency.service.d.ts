import { CrudService } from '../core/crud/crud.service';
import { TypeOrmCurrencyRepository } from './repository/type-orm-currency.repository';
import { MikroOrmCurrencyRepository } from './repository/mikro-orm-currency.repository';
import { Currency } from './currency.entity';
export declare class CurrencyService extends CrudService<Currency> {
    constructor(typeOrmCurrencyRepository: TypeOrmCurrencyRepository, mikroOrmCurrencyRepository: MikroOrmCurrencyRepository);
}

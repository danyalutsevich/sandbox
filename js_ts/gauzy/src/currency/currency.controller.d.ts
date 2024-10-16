import { IPagination } from '../../plugins/contracts/dist/index';
import { Currency } from './currency.entity';
import { CurrencyService } from './currency.service';
export declare class CurrencyController {
    private readonly currencyService;
    constructor(currencyService: CurrencyService);
    findAll(): Promise<IPagination<Currency>>;
}

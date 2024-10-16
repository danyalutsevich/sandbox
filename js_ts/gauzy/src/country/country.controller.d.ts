import { IPagination } from '../../plugins/contracts/dist/index';
import { Country } from './country.entity';
import { CountryService } from './country.service';
export declare class CountryController {
    private readonly countryService;
    constructor(countryService: CountryService);
    findAll(): Promise<IPagination<Country>>;
}

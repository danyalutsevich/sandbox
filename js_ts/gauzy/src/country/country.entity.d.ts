import { ICountry } from '../../plugins/contracts/dist/index';
import { BaseEntity } from '../core/entities/internal';
export declare class Country extends BaseEntity implements ICountry {
    isoCode: string;
    country: string;
}

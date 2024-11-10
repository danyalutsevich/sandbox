import { DataSource } from 'typeorm';
import { ICountry } from '../../plugins/contracts/dist/index';
export declare const createCountries: (dataSource: DataSource) => Promise<ICountry[]>;

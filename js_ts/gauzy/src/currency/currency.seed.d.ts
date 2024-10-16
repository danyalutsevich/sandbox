import { DataSource } from 'typeorm';
import { ICurrency } from '../../plugins/contracts/dist/index';
export declare const createCurrencies: (dataSource: DataSource) => Promise<ICurrency[]>;

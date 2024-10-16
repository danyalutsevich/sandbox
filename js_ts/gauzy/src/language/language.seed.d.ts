import { DataSource } from 'typeorm';
import { ILanguage } from '../../plugins/contracts/dist/index';
export declare const createLanguages: (dataSource: DataSource) => Promise<ILanguage[]>;

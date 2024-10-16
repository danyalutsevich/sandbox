import { DataSource } from 'typeorm';
import { IIntegrationMap, ITenant } from '../../plugins/contracts/dist/index';
export declare const createRandomIntegrationMap: (dataSource: DataSource, tenants: ITenant[]) => Promise<IIntegrationMap[]>;

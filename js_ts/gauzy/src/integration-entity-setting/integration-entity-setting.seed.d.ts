import { DataSource } from 'typeorm';
import { IIntegrationEntitySetting, ITenant } from '../../plugins/contracts/dist/index';
export declare const createRandomIntegrationEntitySetting: (dataSource: DataSource, tenants: ITenant[]) => Promise<IIntegrationEntitySetting[]>;

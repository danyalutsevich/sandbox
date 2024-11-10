import { DataSource } from 'typeorm';
import { IIntegrationEntitySettingTied, ITenant } from '../../plugins/contracts/dist/index';
export declare const createRandomIntegrationEntitySettingTied: (dataSource: DataSource, tenants: ITenant[]) => Promise<IIntegrationEntitySettingTied[]>;

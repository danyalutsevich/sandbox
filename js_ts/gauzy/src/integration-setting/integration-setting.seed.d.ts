import { DataSource } from 'typeorm';
import { IntegrationSetting } from './integration-setting.entity';
import { ITenant } from '../../plugins/contracts/dist/index';
export declare const createRandomIntegrationSetting: (dataSource: DataSource, tenants: ITenant[]) => Promise<IntegrationSetting[]>;

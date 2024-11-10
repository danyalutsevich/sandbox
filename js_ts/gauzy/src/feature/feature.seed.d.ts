import { ApplicationPluginConfig } from '../../plugins/common/dist/index';
import { IFeature, ITenant } from '../../plugins/contracts/dist/index';
import { DataSource } from 'typeorm';
import { Feature } from './feature.entity';
export declare const createDefaultFeatureToggle: (dataSource: DataSource, config: Partial<ApplicationPluginConfig>, tenant: ITenant) => Promise<Feature[]>;
export declare const createRandomFeatureToggle: (dataSource: DataSource, tenants: ITenant[]) => Promise<IFeature[]>;

import { DataSource } from 'typeorm';
import { IOrganization, IProductVariantSetting, ITenant } from '../../plugins/contracts/dist/index';
export declare const createRandomProductVariantSettings: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>) => Promise<IProductVariantSetting[]>;

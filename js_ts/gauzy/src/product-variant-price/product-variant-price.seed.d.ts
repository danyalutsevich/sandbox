import { DataSource } from 'typeorm';
import { IOrganization, IProductVariantPrice, ITenant } from '../../plugins/contracts/dist/index';
export declare const createRandomProductVariantPrice: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>) => Promise<IProductVariantPrice[]>;

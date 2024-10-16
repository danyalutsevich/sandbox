import { DataSource } from 'typeorm';
import { IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { ProductType } from './product-type.entity';
export declare const createDefaultProductType: (dataSource: DataSource, tenant: ITenant, organizations: IOrganization[]) => Promise<ProductType[]>;
export declare const createRandomProductType: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>) => Promise<ProductType[]>;

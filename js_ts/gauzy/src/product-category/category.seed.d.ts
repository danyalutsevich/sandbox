import { DataSource } from 'typeorm';
import { ProductCategory } from './product-category.entity';
import { IOrganization, ITenant } from '../../plugins/contracts/dist/index';
export declare const createCategories: (dataSource: DataSource, tenant: ITenant, organizations: IOrganization[]) => Promise<ProductCategory[]>;
export declare const createRandomProductCategories: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>) => Promise<ProductCategory[]>;

import { DataSource } from 'typeorm';
import { IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { Product } from './../core/entities/internal';
export declare const createDefaultProducts: (dataSource: DataSource, tenant: ITenant, organization: IOrganization) => Promise<void>;
export declare const createRandomProduct: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>) => Promise<Product[]>;

import { DataSource } from 'typeorm';
import { IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { ProductOption } from './product-option.entity';
import { ProductOptionGroup } from './product-option-group.entity';
export declare const createRandomProductOption: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>, numberOfOptionPerProduct: any) => Promise<ProductOption[]>;
export declare const createRandomProductOptionGroups: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>, numberOfOptionGroupPerProduct: any) => Promise<ProductOptionGroup[]>;

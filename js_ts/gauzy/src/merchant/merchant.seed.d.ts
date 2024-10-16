import { DataSource } from 'typeorm';
import { IOrganization, ITenant } from '../../plugins/contracts/dist/index';
export declare const createRandomMerchants: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>) => Promise<void>;
export declare const createDefaultMerchants: (dataSource: DataSource, tenant: ITenant, organizations: IOrganization[]) => Promise<void>;

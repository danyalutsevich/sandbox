import { DataSource } from 'typeorm';
import { IOrganization, IOrganizationAward, ITenant } from '../../plugins/contracts/dist/index';
export declare const createDefaultAwards: (dataSource: DataSource, tenant: ITenant, organizations: IOrganization[]) => Promise<IOrganizationAward[]>;
export declare const createRandomAwards: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>) => Promise<IOrganizationAward[]>;

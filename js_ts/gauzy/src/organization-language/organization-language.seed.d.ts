import { DataSource } from 'typeorm';
import { IOrganization, IOrganizationLanguage, ITenant } from '../../plugins/contracts/dist/index';
export declare const createDefaultOrganizationLanguage: (dataSource: DataSource, tenant: ITenant, defaultOrganizations: IOrganization[]) => Promise<IOrganizationLanguage[]>;
export declare const createRandomOrganizationLanguage: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>) => Promise<IOrganizationLanguage[]>;

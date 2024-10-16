import { DataSource } from 'typeorm';
import { IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { Organization } from '../core/entities/internal';
export declare const getDefaultOrganization: (dataSource: DataSource, tenant: ITenant) => Promise<IOrganization>;
export declare const getDefaultOrganizations: (dataSource: DataSource, tenant: ITenant) => Promise<IOrganization[]>;
export declare const createDefaultOrganizations: (dataSource: DataSource, tenant: ITenant, organizations: any) => Promise<Organization[]>;
export declare const createRandomOrganizations: (dataSource: DataSource, tenants: ITenant[], organizationsPerTenant: number) => Promise<Map<ITenant, IOrganization[]>>;

import { DataSource } from 'typeorm';
import { IOrganization, IPipeline, ITenant } from '../../plugins/contracts/dist/index';
export declare const createDefaultPipeline: (dataSource: DataSource, tenant: ITenant, tenantOrganizations: any) => Promise<IPipeline[]>;
export declare const createRandomPipeline: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>) => Promise<IPipeline[]>;

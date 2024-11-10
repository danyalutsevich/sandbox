import { DataSource } from 'typeorm';
import { ITenant } from '../../plugins/contracts/dist/index';
import { IntegrationTenant } from './integration-tenant.entity';
export declare const createRandomIntegrationTenant: (dataSource: DataSource, tenants: ITenant[]) => Promise<IntegrationTenant[]>;

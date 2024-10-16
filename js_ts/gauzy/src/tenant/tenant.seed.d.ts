import { DataSource } from 'typeorm';
import { Tenant } from './tenant.entity';
export declare const getDefaultTenant: (dataSource: DataSource, tenantName?: string) => Promise<Tenant>;
export declare const createDefaultTenant: (dataSource: DataSource, tenantName: string) => Promise<Tenant>;
export declare const createRandomTenants: (dataSource: DataSource, noOfTenants?: number) => Promise<Tenant[]>;

import { DataSource } from 'typeorm';
import { IEmployee, IOrganization, ITenant, IUser } from '../../plugins/contracts/dist/index';
export declare const createDefaultEmployees: (dataSource: DataSource, tenant: ITenant, organization: IOrganization, users: IUser[], defaultEmployees: any) => Promise<IEmployee[]>;
export declare const createRandomEmployees: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>, organizationUsersMap: Map<IOrganization, IUser[]>) => Promise<Map<IOrganization, IEmployee[]>>;
export declare const getDefaultEmployees: (dataSource: DataSource, tenant: ITenant) => Promise<IEmployee[]>;

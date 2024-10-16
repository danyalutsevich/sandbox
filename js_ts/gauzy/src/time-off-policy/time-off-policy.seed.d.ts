import { DataSource } from 'typeorm';
import { ITimeOffPolicy as ITimeOfPolicy, IOrganization, IEmployee, ITenant } from '../../plugins/contracts/dist/index';
import { TimeOffPolicy } from './time-off-policy.entity';
export declare const createDefaultTimeOffPolicy: (dataSource: DataSource, tenant: ITenant, organization: IOrganization, employees: IEmployee[]) => Promise<ITimeOfPolicy>;
export declare const createRandomTimeOffPolicies: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>) => Promise<TimeOffPolicy[]>;

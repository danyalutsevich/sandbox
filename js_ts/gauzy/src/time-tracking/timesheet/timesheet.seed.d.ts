import { DataSource } from 'typeorm';
import { ITenant, IEmployee, IOrganization } from '../../../plugins/contracts';
import { ApplicationPluginConfig } from '../../../plugins/common/dist/index';
export declare const createDefaultTimeSheet: (dataSource: DataSource, config: Partial<ApplicationPluginConfig>, tenant: ITenant, organization: IOrganization, employees: IEmployee[]) => Promise<void>;
export declare const createRandomTimesheet: (dataSource: DataSource, config: Partial<ApplicationPluginConfig>, tenants: ITenant[]) => Promise<void>;

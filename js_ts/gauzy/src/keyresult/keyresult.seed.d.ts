import { DataSource } from 'typeorm';
import { KeyResult } from './keyresult.entity';
import { IEmployee, IOrganization, ITenant } from '../../plugins/contracts/dist/index';
export declare const createDefaultKeyResults: (dataSource: DataSource, tenant: ITenant, employees: IEmployee[], goals: any) => Promise<KeyResult[]>;
export declare const updateDefaultKeyResultProgress: (dataSource: DataSource) => Promise<KeyResult[]>;
export declare const createRandomKeyResult: (dataSource: DataSource, tenants: ITenant[], goals: any, tenantOrganizationsMap: Map<ITenant, IOrganization[]>, organizationEmployeesMap: Map<IOrganization, IEmployee[]>) => Promise<KeyResult[]>;

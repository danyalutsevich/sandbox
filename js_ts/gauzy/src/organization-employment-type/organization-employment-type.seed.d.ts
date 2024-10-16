import { IEmployee, IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { DataSource } from 'typeorm';
export declare const seedDefaultEmploymentTypes: (dataSource: DataSource, tenant: ITenant, employees: IEmployee[], defaultOrganization: IOrganization) => Promise<void>;
export declare const seedRandomEmploymentTypes: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>) => Promise<void>;

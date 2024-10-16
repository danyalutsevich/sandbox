import { DataSource } from 'typeorm';
import { IEmployee, IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { Payment } from './payment.entity';
export declare const createDefaultPayment: (dataSource: DataSource, tenant: ITenant, employees: IEmployee[], organizations: IOrganization[]) => Promise<Payment[]>;
export declare const createRandomPayment: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>, organizationEmployeesMap: Map<IOrganization, IEmployee[]>) => Promise<Payment[]>;

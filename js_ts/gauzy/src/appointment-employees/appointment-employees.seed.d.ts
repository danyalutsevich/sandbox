import { DataSource } from 'typeorm';
import { IAppointmentEmployee, IEmployee, IOrganization, ITenant } from '../../plugins/contracts/dist/index';
export declare const createRandomAppointmentEmployees: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>, organizationEmployeesMap: Map<IOrganization, IEmployee[]>) => Promise<IAppointmentEmployee[]>;

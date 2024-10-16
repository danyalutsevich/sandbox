import { DataSource } from 'typeorm';
import { IEmployee, IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { EmployeeAppointment } from './employee-appointment.entity';
export declare const createDefaultEmployeeAppointment: (dataSource: DataSource, tenant: ITenant, employees: IEmployee[], organizations: any) => Promise<EmployeeAppointment[]>;
export declare const createRandomEmployeeAppointment: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>, organizationEmployeesMap: Map<IOrganization, IEmployee[]>) => Promise<EmployeeAppointment[]>;

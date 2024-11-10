import { DataSource } from 'typeorm';
import { IEmployee, IOrganization, ITenant, ITimeOff as ITimeOffRequest } from '../../plugins/contracts/dist/index';
import { TimeOffRequest } from './time-off-request.entity';
export declare const createDefaultEmployeeTimeOff: (dataSource: DataSource, tenant: ITenant, organization: IOrganization, employees: IEmployee[], noOfEmployeeTimeOffRequest: number) => Promise<ITimeOffRequest[]>;
export declare const createRandomEmployeeTimeOff: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>, organizationEmployeesMap: Map<IOrganization, IEmployee[]>, noOfEmployeeTimeOffRequest: number) => Promise<TimeOffRequest[]>;

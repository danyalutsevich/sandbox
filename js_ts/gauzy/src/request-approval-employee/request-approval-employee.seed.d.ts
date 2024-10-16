import { DataSource } from 'typeorm';
import { IEmployee, IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { RequestApprovalEmployee } from './request-approval-employee.entity';
export declare const createRandomRequestApprovalEmployee: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>, organizationEmployeesMap: Map<IOrganization, IEmployee[]>) => Promise<RequestApprovalEmployee[]>;

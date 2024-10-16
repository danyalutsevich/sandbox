import { DataSource } from 'typeorm';
import { IEmployee, IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { ApprovalPolicy } from '../approval-policy/approval-policy.entity';
export declare const createDefaultRequestApprovalEmployee: (dataSource: DataSource, defaultData: {
    employees: IEmployee[];
    orgs: IOrganization[];
    approvalPolicies: ApprovalPolicy[] | void;
}) => Promise<void>;
export declare const createRandomRequestApproval: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>, organizationEmployeesMap: Map<IOrganization, IEmployee[]>, noOfRequestsPerOrganizations: number) => Promise<any>;

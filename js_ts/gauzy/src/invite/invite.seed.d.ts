import { DataSource } from 'typeorm';
import { IOrganization, ITenant, IUser } from '../../plugins/contracts/dist/index';
export declare const createDefaultEmployeeInviteSent: (dataSource: DataSource, tenant: ITenant, organizations: IOrganization[], SuperAdmin: IUser[]) => Promise<any>;
export declare const createRandomEmployeeInviteSent: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>, tenantSuperAdminMap: Map<ITenant, IUser[]>, noOfInvitesPerOrganization: number) => Promise<any>;

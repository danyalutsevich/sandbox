import { DataSource } from 'typeorm';
import { IOrganization, IUser, IUserOrganization, ISeedUsers, ITenant } from '../../plugins/contracts/dist/index';
export declare const createDefaultUsersOrganizations: (dataSource: DataSource, tenant: ITenant, organizations: IOrganization[], users: IUser[]) => Promise<IUserOrganization[]>;
export declare const createRandomUsersOrganizations: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>, tenantSuperAdminsMap: Map<ITenant, IUser[]>, tenantUsersMap: Map<ITenant, ISeedUsers>, employeesPerOrganization: number, adminPerOrganization: number) => Promise<Map<IOrganization, IUser[]>>;

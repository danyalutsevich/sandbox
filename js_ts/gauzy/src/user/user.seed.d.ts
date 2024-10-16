import { DataSource } from 'typeorm';
import { ISeedUsers, ITenant, IUser } from '../../plugins/contracts/dist/index';
export declare const createDefaultAdminUsers: (dataSource: DataSource, tenant: ITenant) => Promise<{
    defaultSuperAdminUsers: IUser[];
    defaultAdminUsers: IUser[];
}>;
export declare const createDefaultEmployeesUsers: (dataSource: DataSource, tenant: ITenant) => Promise<{
    defaultEmployeeUsers: IUser[];
}>;
export declare const createRandomSuperAdminUsers: (dataSource: DataSource, tenants: ITenant[], noOfSuperAdmins: number) => Promise<Map<ITenant, IUser[]>>;
export declare const createDefaultUsers: (dataSource: DataSource, tenant: ITenant) => Promise<{
    defaultEverEmployeeUsers: IUser[];
    defaultCandidateUsers: IUser[];
}>;
export declare const createRandomUsers: (dataSource: DataSource, tenants: ITenant[], adminPerOrganization: number, organizationsPerTenant: number, employeesPerOrganization: number, candidatesPerOrganization: number, managersPerOrganization: number, dataEntriesPerOrganization: number, viewersPerOrganization: number) => Promise<Map<ITenant, ISeedUsers>>;

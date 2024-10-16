import { DataSource } from 'typeorm';
import { IOrganization, IOrganizationProject, ITag, ITenant } from '../../plugins/contracts/dist/index';
export declare const createDefaultOrganizationProjects: (dataSource: DataSource, tenant: ITenant, organization: IOrganization) => Promise<IOrganizationProject[]>;
export declare const createRandomOrganizationProjects: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>, tags: ITag[] | void, maxProjectsPerOrganization: any) => Promise<void>;
export declare const assignOrganizationProjectToEmployee: (dataSource: DataSource, tenant: ITenant, organization: IOrganization) => Promise<void>;
export declare function seedProjectMembersCount(dataSource: DataSource, tenants: ITenant[]): Promise<void>;

import { DataSource } from 'typeorm';
import { IEmployee, IOrganization, IOrganizationContact, ITenant } from '../../plugins/contracts/dist/index';
export declare const createDefaultOrganizationContact: (dataSource: DataSource, tenant: ITenant, noOfContactsPerOrganization: number) => Promise<IOrganizationContact[]>;
export declare const createRandomOrganizationContact: (dataSource: DataSource, tenants: ITenant[], noOfContactsPerOrganization: number) => Promise<void>;
export declare const assignOrganizationContactToEmployee: (dataSource: DataSource, tenant: ITenant, organization: IOrganization, employees: IEmployee[]) => Promise<void>;

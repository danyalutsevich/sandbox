import { DataSource } from 'typeorm';
import { IOrganization, IEmployee, IExpenseCategory, IOrganizationVendor, ITenant } from '../../plugins/contracts/dist/index';
import { Expense } from './../core/entities/internal';
export declare const createDefaultExpenses: (dataSource: DataSource, organizations: IOrganization[], tenant: ITenant, employees: IEmployee[], categories: IExpenseCategory[] | void, organizationVendors: IOrganizationVendor[] | void) => Promise<Expense[]>;
export declare const createRandomExpenses: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>, organizationEmployeesMap: Map<IOrganization, IEmployee[]>, organizationVendorsMap: Map<IOrganization, IOrganizationVendor[]> | void, categoriesMap: Map<IOrganization, IExpenseCategory[]> | void) => Promise<void>;
